package com.ayush.College_Management_System.controller;

import com.ayush.College_Management_System.dto.exam.ExamRequestDTO;
import com.ayush.College_Management_System.dto.exam.ExamResponseDTO;
import com.ayush.College_Management_System.model.enums.ExamType;
import com.ayush.College_Management_System.config.TestSecurityConfig;
import com.ayush.College_Management_System.security.jwt.JwtService;
import com.ayush.College_Management_System.security.user.CustomUserDetailsService;
import com.ayush.College_Management_System.service.ExamService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Controller-layer (MockMvc) tests for ExamController.
 *
 * Security notes:
 *  - Unauthenticated → 401 (JWT filter intercepts before Spring Security
 *    can produce a role-based 403).
 *  - Role-mismatch (authenticated but wrong role) → 403.
 *  - DELETE is ADMIN-only. FACULTY delete attempt → 403.
 *  - @WebMvcTest loads real @PreAuthorize processing, so role checks work.
 */
@WebMvcTest(ExamController.class)
@Import(TestSecurityConfig.class)
class ExamControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper om;

    @MockBean JwtService jwtService;
    @MockBean CustomUserDetailsService customUserDetailsService;

    @MockBean ExamService service;

    // ── Fixtures ──────────────────────────────────────────────────────────────

    private ExamResponseDTO midterm;
    private ExamResponseDTO practical;
    private ExamRequestDTO  validRequest;

    @BeforeEach
    void setUp() {
        om.registerModule(new JavaTimeModule());

        midterm = new ExamResponseDTO(
                1L, ExamType.MIDTERM, "2025-26",
                LocalDate.of(2026, 5, 10),
                LocalTime.of(9, 0), LocalTime.of(11, 0),
                100, 40,
                1L, "101", "Block-A",
                3L, "Data Structures", "CS301", 3,
                "B.Tech CS", "Computer Science"
        );

        practical = new ExamResponseDTO(
                2L, ExamType.PRACTICAL, "2025-26",
                LocalDate.of(2026, 5, 20),
                LocalTime.of(14, 0), LocalTime.of(16, 0),
                50, 20,
                2L, "Lab-101", "Block-B",
                4L, "OS Lab", "CS401", 4,
                "B.Tech CS", "Computer Science"
        );

        validRequest = new ExamRequestDTO(
                ExamType.MIDTERM, "2025-26",
                LocalDate.of(2026, 5, 10),
                LocalTime.of(9, 0), LocalTime.of(11, 0),
                100, 40,
                1L, 3L
        );
    }

    // ── GET /api/exams ────────────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/exams → 200 with list")
    @WithMockUser
    void getAll_returns200() throws Exception {
        when(service.getAll()).thenReturn(List.of(midterm, practical));

        mvc.perform(get("/api/exams"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].examType",    is("MIDTERM")))
                .andExpect(jsonPath("$[0].session",     is("2025-26")))
                .andExpect(jsonPath("$[0].maxMarks",    is(100)))
                .andExpect(jsonPath("$[0].subjectName", is("Data Structures")))
                .andExpect(jsonPath("$[1].examType",    is("PRACTICAL")));
    }

    // ── GET /api/exams/{id} ───────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/1 → 200 with enriched body")
    @WithMockUser
    void getById_returns200WithEnrichedData() throws Exception {
        when(service.getById(1L)).thenReturn(midterm);

        mvc.perform(get("/api/exams/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id",                  is(1)))
                .andExpect(jsonPath("$.examType",            is("MIDTERM")))
                .andExpect(jsonPath("$.classroomRoomNumber", is("101")))
                .andExpect(jsonPath("$.departmentName",      is("Computer Science")))
                .andExpect(jsonPath("$.courseName",          is("B.Tech CS")))
                .andExpect(jsonPath("$.semesterNumber",      is(3)));
    }

    // ── POST /api/exams ───────────────────────────────────────────────────────

    @Test
    @DisplayName("POST /api/exams as ADMIN → 201 Created")
    @WithMockUser(roles = "ADMIN")
    void create_asAdmin_returns201() throws Exception {
        when(service.create(any())).thenReturn(midterm);

        mvc.perform(post("/api/exams")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.examType", is("MIDTERM")))
                .andExpect(jsonPath("$.session",  is("2025-26")));

        verify(service).create(any(ExamRequestDTO.class));
    }

    @Test
    @DisplayName("POST /api/exams as FACULTY → 201 Created")
    @WithMockUser(roles = "FACULTY")
    void create_asFaculty_returns201() throws Exception {
        when(service.create(any())).thenReturn(midterm);

        mvc.perform(post("/api/exams")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("POST /api/exams without auth → 401 Unauthorized")
    void create_withoutAuth_returns401() throws Exception {
        mvc.perform(post("/api/exams")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/exams as STUDENT → 403 Forbidden")
    @WithMockUser(roles = "STUDENT")
    void create_asStudent_returns403() throws Exception {
        mvc.perform(post("/api/exams")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/exams with bad session format → 400 Bad Request")
    @WithMockUser(roles = "ADMIN")
    void create_badSessionFormat_returns400() throws Exception {
        ExamRequestDTO bad = new ExamRequestDTO(
                ExamType.MIDTERM, "bad-session",   // violates @Pattern
                LocalDate.of(2026, 5, 10),
                LocalTime.of(9, 0), LocalTime.of(11, 0),
                100, 40, 1L, 3L
        );

        mvc.perform(post("/api/exams")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/exams with null examType → 400 Bad Request")
    @WithMockUser(roles = "ADMIN")
    void create_nullExamType_returns400() throws Exception {
        ExamRequestDTO bad = new ExamRequestDTO(
                null, "2025-26",                   // violates @NotNull
                LocalDate.of(2026, 5, 10),
                LocalTime.of(9, 0), LocalTime.of(11, 0),
                100, 40, 1L, 3L
        );

        mvc.perform(post("/api/exams")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    // ── PUT /api/exams/{id} ───────────────────────────────────────────────────

    @Test
    @DisplayName("PUT /api/exams/1 as ADMIN → 200 Updated")
    @WithMockUser(roles = "ADMIN")
    void update_asAdmin_returns200() throws Exception {
        when(service.update(eq(1L), any())).thenReturn(midterm);

        mvc.perform(put("/api/exams/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    @DisplayName("PUT /api/exams/1 as STUDENT → 403 Forbidden")
    @WithMockUser(roles = "STUDENT")
    void update_asStudent_returns403() throws Exception {
        mvc.perform(put("/api/exams/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    // ── DELETE /api/exams/{id} ────────────────────────────────────────────────

    @Test
    @DisplayName("DELETE /api/exams/1 as ADMIN → 204 No Content")
    @WithMockUser(roles = "ADMIN")
    void delete_asAdmin_returns204() throws Exception {
        doNothing().when(service).delete(1L);

        mvc.perform(delete("/api/exams/1").with(csrf()))
                .andExpect(status().isNoContent());

        verify(service).delete(1L);
    }

    @Test
    @DisplayName("DELETE /api/exams/1 as FACULTY → 403 Forbidden")
    @WithMockUser(roles = "FACULTY")
    void delete_asFaculty_returns403() throws Exception {
        mvc.perform(delete("/api/exams/1").with(csrf()))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("DELETE /api/exams/1 without auth → 401 Unauthorized")
    void delete_withoutAuth_returns401() throws Exception {
        mvc.perform(delete("/api/exams/1").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    // ── GET /api/exams/upcoming ───────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/upcoming → 200 with future exams")
    @WithMockUser
    void getUpcoming_returns200() throws Exception {
        when(service.getUpcoming()).thenReturn(List.of(midterm, practical));

        mvc.perform(get("/api/exams/upcoming"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    // ── GET /api/exams/subject/{subjectId} ───────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/subject/3 → 200 filtered by subject")
    @WithMockUser
    void getBySubject_returns200() throws Exception {
        when(service.getBySubject(3L)).thenReturn(List.of(midterm));

        mvc.perform(get("/api/exams/subject/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].subjectCode", is("CS301")));
    }

    // ── GET /api/exams/type/{examType} ───────────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/type/MIDTERM → 200 filtered by type")
    @WithMockUser
    void getByType_returns200() throws Exception {
        when(service.getByExamType(ExamType.MIDTERM)).thenReturn(List.of(midterm));

        mvc.perform(get("/api/exams/type/MIDTERM"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].examType", is("MIDTERM")));
    }

    // ── GET /api/exams/session/{session} ─────────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/session/2025-26 → 200 filtered by session")
    @WithMockUser
    void getBySession_returns200() throws Exception {
        when(service.getBySession("2025-26")).thenReturn(List.of(midterm, practical));

        mvc.perform(get("/api/exams/session/2025-26"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].session", is("2025-26")));
    }

    // ── GET /api/exams/range ──────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/range?from=2026-05-01&to=2026-05-31 → 200")
    @WithMockUser
    void getByDateRange_returns200() throws Exception {
        when(service.getByDateRange(
                LocalDate.of(2026, 5, 1),
                LocalDate.of(2026, 5, 31)))
                .thenReturn(List.of(midterm, practical));

        mvc.perform(get("/api/exams/range")
                        .param("from", "2026-05-01")
                        .param("to",   "2026-05-31"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    // ── GET /api/exams/classroom/{classroomId} ────────────────────────────────

    @Test
    @DisplayName("GET /api/exams/classroom/1 as ADMIN → 200 with exams in that room")
    @WithMockUser(roles = "ADMIN")
    void getByClassroom_asAdmin_returns200() throws Exception {
        when(service.getByClassroom(1L)).thenReturn(List.of(midterm));

        mvc.perform(get("/api/exams/classroom/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].classroomId", is(1)));
    }

    @Test
    @DisplayName("GET /api/exams/classroom/1 as FACULTY → 200")
    @WithMockUser(roles = "FACULTY")
    void getByClassroom_asFaculty_returns200() throws Exception {
        when(service.getByClassroom(1L)).thenReturn(List.of(midterm));

        mvc.perform(get("/api/exams/classroom/1"))
                .andExpect(status().isOk());
    }
}
