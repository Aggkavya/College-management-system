package com.ayush.College_Management_System.controller;

import com.ayush.College_Management_System.dto.classroom.ClassroomRequestDTO;
import com.ayush.College_Management_System.dto.classroom.ClassroomResponseDTO;
import com.ayush.College_Management_System.model.enums.ClassroomType;
import com.ayush.College_Management_System.config.TestSecurityConfig;
import com.ayush.College_Management_System.security.jwt.JwtService;
import com.ayush.College_Management_System.security.user.CustomUserDetailsService;
import com.ayush.College_Management_System.service.ClassroomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Controller-layer (MockMvc) tests for ClassroomController.
 *
 * Security notes:
 *  - Unauthenticated requests → 401 (JWT filter, not Spring's AccessDeniedException).
 *  - Wrong role (e.g. STUDENT hitting admin endpoint) → 403.
 *  - Public GETs still need @WithMockUser in the @WebMvcTest slice so the
 *    mocked JWT filter doesn't block them.
 */
@WebMvcTest(ClassroomController.class)
@Import(TestSecurityConfig.class)
class ClassroomControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper om;

    @MockBean JwtService jwtService;
    @MockBean CustomUserDetailsService customUserDetailsService;

    @MockBean ClassroomService service;

    // ── Fixtures ──────────────────────────────────────────────────────────────

    private ClassroomResponseDTO room101;
    private ClassroomResponseDTO room202;
    private ClassroomRequestDTO  validRequest;

    @BeforeEach
    void setUp() {
        room101 = new ClassroomResponseDTO(
                1L, "101", "Block-A", 0, 60,
                ClassroomType.LECTURE_HALL, true, true, true,
                "Computer Science"
        );
        room202 = new ClassroomResponseDTO(
                2L, "202", "Block-B", 1, 30,
                ClassroomType.LABORATORY, false, false, false,
                "Mechanical"
        );
        validRequest = new ClassroomRequestDTO(
                "101", "Block-A", 0, 60,
                ClassroomType.LECTURE_HALL, true, true, true, 1L
        );
    }

    // ── GET /api/classrooms ───────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/classrooms → 200 with all classrooms")
    @WithMockUser
    void getAll_returns200WithList() throws Exception {
        when(service.getAll()).thenReturn(List.of(room101, room202));

        mvc.perform(get("/api/classrooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].roomNumber",    is("101")))
                .andExpect(jsonPath("$[0].classroomType", is("LECTURE_HALL")))
                .andExpect(jsonPath("$[1].isAvailable",   is(false)));
    }

    // ── GET /api/classrooms/{id} ──────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/classrooms/1 → 200 with classroom detail")
    @WithMockUser
    void getById_returns200() throws Exception {
        when(service.getById(1L)).thenReturn(room101);

        mvc.perform(get("/api/classrooms/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id",             is(1)))
                .andExpect(jsonPath("$.building",       is("Block-A")))
                .andExpect(jsonPath("$.capacity",       is(60)))
                .andExpect(jsonPath("$.departmentName", is("Computer Science")));
    }

    // ── POST /api/classrooms ──────────────────────────────────────────────────

    @Test
    @DisplayName("POST /api/classrooms as ADMIN → 201 Created")
    @WithMockUser(roles = "ADMIN")
    void create_asAdmin_returns201() throws Exception {
        when(service.create(any())).thenReturn(room101);

        mvc.perform(post("/api/classrooms")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.roomNumber",    is("101")))
                .andExpect(jsonPath("$.classroomType", is("LECTURE_HALL")));

        verify(service).create(any(ClassroomRequestDTO.class));
    }

    @Test
    @DisplayName("POST /api/classrooms without auth → 401 Unauthorized")
    void create_withoutAuth_returns401() throws Exception {
        mvc.perform(post("/api/classrooms")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/classrooms as STUDENT → 403 Forbidden")
    @WithMockUser(roles = "STUDENT")
    void create_asStudent_returns403() throws Exception {
        mvc.perform(post("/api/classrooms")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/classrooms with blank roomNumber → 400 Bad Request")
    @WithMockUser(roles = "ADMIN")
    void create_blankRoomNumber_returns400() throws Exception {
        ClassroomRequestDTO bad = new ClassroomRequestDTO(
                "", "Block-A", 0, 60,          // blank roomNumber
                ClassroomType.LECTURE_HALL, true, true, true, 1L
        );

        mvc.perform(post("/api/classrooms")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/classrooms with null departmentId → 400 Bad Request")
    @WithMockUser(roles = "ADMIN")
    void create_nullDeptId_returns400() throws Exception {
        ClassroomRequestDTO bad = new ClassroomRequestDTO(
                "101", "Block-A", 0, 60,
                ClassroomType.LECTURE_HALL, true, true, true,
                null   // @NotNull violation
        );

        mvc.perform(post("/api/classrooms")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    // ── PUT /api/classrooms/{id} ─────────────────────────────────────────────

    @Test
    @DisplayName("PUT /api/classrooms/1 as ADMIN → 200 Updated")
    @WithMockUser(roles = "ADMIN")
    void update_asAdmin_returns200() throws Exception {
        ClassroomResponseDTO updated = new ClassroomResponseDTO(
                1L, "101-updated", "Block-A", 0, 80,
                ClassroomType.LECTURE_HALL, true, true, true, "CS"
        );
        when(service.update(eq(1L), any())).thenReturn(updated);

        mvc.perform(put("/api/classrooms/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.roomNumber", is("101-updated")))
                .andExpect(jsonPath("$.capacity",   is(80)));
    }

    @Test
    @DisplayName("PUT /api/classrooms/1 without auth → 401 Unauthorized")
    void update_withoutAuth_returns401() throws Exception {
        mvc.perform(put("/api/classrooms/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isUnauthorized());
    }

    // ── DELETE /api/classrooms/{id} ───────────────────────────────────────────

    @Test
    @DisplayName("DELETE /api/classrooms/1 as ADMIN → 204 No Content")
    @WithMockUser(roles = "ADMIN")
    void delete_asAdmin_returns204() throws Exception {
        doNothing().when(service).delete(1L);

        mvc.perform(delete("/api/classrooms/1").with(csrf()))
                .andExpect(status().isNoContent());

        verify(service).delete(1L);
    }

    @Test
    @DisplayName("DELETE /api/classrooms/1 as FACULTY → 403 Forbidden")
    @WithMockUser(roles = "FACULTY")
    void delete_asFaculty_returns403() throws Exception {
        mvc.perform(delete("/api/classrooms/1").with(csrf()))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    // ── PATCH /api/classrooms/{id}/availability ───────────────────────────────

    @Test
    @DisplayName("PATCH /classrooms/2/availability?value=false → 200 (mark unavailable)")
    @WithMockUser(roles = "ADMIN")
    void toggleAvailability_toFalse_returns200() throws Exception {
        ClassroomResponseDTO unavailable = new ClassroomResponseDTO(
                2L, "202", "Block-B", 1, 30,
                ClassroomType.LABORATORY, false, false, false, "Mechanical"
        );
        when(service.toggleAvailability(2L, false)).thenReturn(unavailable);

        mvc.perform(patch("/api/classrooms/2/availability")
                        .with(csrf())
                        .param("value", "false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isAvailable", is(false)));
    }

    @Test
    @DisplayName("PATCH /classrooms/1/availability?value=true → 200 (mark available)")
    @WithMockUser(roles = "ADMIN")
    void toggleAvailability_toTrue_returns200() throws Exception {
        when(service.toggleAvailability(1L, true)).thenReturn(room101);

        mvc.perform(patch("/api/classrooms/1/availability")
                        .with(csrf())
                        .param("value", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isAvailable", is(true)));
    }

    // ── GET /api/classrooms/available ─────────────────────────────────────────

    @Test
    @DisplayName("GET /api/classrooms/available → 200 with only available rooms")
    @WithMockUser
    void getAvailable_returnsOnlyAvailable() throws Exception {
        when(service.getAvailable()).thenReturn(List.of(room101));

        mvc.perform(get("/api/classrooms/available"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].isAvailable", is(true)));
    }

    // ── GET /api/classrooms/type/{type} ──────────────────────────────────────

    @Test
    @DisplayName("GET /api/classrooms/type/LABORATORY → 200 filtered by type")
    @WithMockUser
    void getByType_returns200() throws Exception {
        when(service.getByType(ClassroomType.LABORATORY)).thenReturn(List.of(room202));

        mvc.perform(get("/api/classrooms/type/LABORATORY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].classroomType", is("LABORATORY")));
    }

    // ── GET /api/classrooms/department/{deptId} ───────────────────────────────

    @Test
    @DisplayName("GET /api/classrooms/department/1 → 200 filtered by department")
    @WithMockUser
    void getByDepartment_returns200() throws Exception {
        when(service.getByDepartment(1L)).thenReturn(List.of(room101));

        mvc.perform(get("/api/classrooms/department/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].departmentName", is("Computer Science")));
    }
}
