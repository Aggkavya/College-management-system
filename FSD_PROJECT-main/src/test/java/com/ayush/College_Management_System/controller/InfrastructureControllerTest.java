package com.ayush.College_Management_System.controller;

import com.ayush.College_Management_System.dto.infrastructure.InfrastructureRequestDTO;
import com.ayush.College_Management_System.dto.infrastructure.InfrastructureResponseDTO;
import com.ayush.College_Management_System.model.enums.InfrastructureStatus;
import com.ayush.College_Management_System.model.enums.InfrastructureType;
import com.ayush.College_Management_System.config.TestSecurityConfig;
import com.ayush.College_Management_System.security.jwt.JwtService;
import com.ayush.College_Management_System.security.user.CustomUserDetailsService;
import com.ayush.College_Management_System.service.InfrastructureService;
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
 * Controller-layer (MockMvc) tests for InfrastructureController.
 *
 * Security notes:
 *  - @WebMvcTest loads the full Spring Security filter chain.
 *  - GET /api/** is permitAll() in SecurityConfig, but the JwtAuthFilter still
 *    intercepts every request. In the test slice JwtService and
 *    CustomUserDetailsService are mocked (returning null by default), so any
 *    request without a real token gets a 401 from the JWT filter.
 *  - Fix: annotate every test that hits a public-GET route with @WithMockUser
 *    so Spring Security sets an authenticated principal before the filter runs.
 *  - Mutation / write endpoints require ROLE_ADMIN → use @WithMockUser(roles="ADMIN").
 *  - "No auth" scenarios → unauthenticated = 401 (not 403).
 */
@WebMvcTest(InfrastructureController.class)
@Import(TestSecurityConfig.class)
class InfrastructureControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper om;

    // Mocked to satisfy beans that SecurityConfig/JWT filter pulls in
    @MockBean JwtService jwtService;
    @MockBean CustomUserDetailsService customUserDetailsService;

    @MockBean InfrastructureService service;

    // ── Fixtures ──────────────────────────────────────────────────────────────

    private InfrastructureResponseDTO response1;
    private InfrastructureResponseDTO response2;
    private InfrastructureRequestDTO  validRequest;

    @BeforeEach
    void setUp() {
        response1 = new InfrastructureResponseDTO(
                1L, "Lab-101", 1, "A", 40,
                true, 20,
                InfrastructureStatus.AVAILABLE,
                InfrastructureType.LABORATORY,
                "Computer Science"
        );
        response2 = new InfrastructureResponseDTO(
                2L, "Room-202", 2, "B", 60,
                false, 0,
                InfrastructureStatus.UNDER_MAINTENANCE,
                InfrastructureType.CLASSROOM,
                "Mechanical"
        );
        validRequest = new InfrastructureRequestDTO(
                "Lab-103", 1, "A", 40,
                true, 20,
                InfrastructureStatus.AVAILABLE,
                InfrastructureType.LABORATORY,
                1L
        );
    }

    // ── GET /api/infrastructure ───────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/infrastructure → 200 with full list")
    @WithMockUser   // public route, but JWT filter needs a principal in test slice
    void getAll_returns200WithList() throws Exception {
        when(service.getAll()).thenReturn(List.of(response1, response2));

        mvc.perform(get("/api/infrastructure"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id",            is(1)))
                .andExpect(jsonPath("$[0].roomOrLabName", is("Lab-101")))
                .andExpect(jsonPath("$[0].type",          is("LABORATORY")))
                .andExpect(jsonPath("$[0].status",        is("AVAILABLE")))
                .andExpect(jsonPath("$[1].status",        is("UNDER_MAINTENANCE")));
    }

    // ── GET /api/infrastructure/{id} ─────────────────────────────────────────

    @Test
    @DisplayName("GET /api/infrastructure/1 → 200 with correct body")
    @WithMockUser
    void getById_returns200() throws Exception {
        when(service.getById(1L)).thenReturn(response1);

        mvc.perform(get("/api/infrastructure/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id",             is(1)))
                .andExpect(jsonPath("$.roomOrLabName",  is("Lab-101")))
                .andExpect(jsonPath("$.block",          is("A")))
                .andExpect(jsonPath("$.departmentName", is("Computer Science")));
    }

    // ── POST /api/infrastructure ──────────────────────────────────────────────

    @Test
    @DisplayName("POST /api/infrastructure as ADMIN → 201 Created")
    @WithMockUser(roles = "ADMIN")
    void create_asAdmin_returns201() throws Exception {
        when(service.create(any())).thenReturn(response1);

        mvc.perform(post("/api/infrastructure")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.roomOrLabName", is("Lab-101")))
                .andExpect(jsonPath("$.type",         is("LABORATORY")));

        verify(service).create(any(InfrastructureRequestDTO.class));
    }

    @Test
    @DisplayName("POST /api/infrastructure without auth → 401 Unauthorized")
    void create_withoutAuth_returns401() throws Exception {
        mvc.perform(post("/api/infrastructure")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isUnauthorized());   // JWT filter → 401

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/infrastructure as STUDENT → 403 Forbidden")
    @WithMockUser(roles = "STUDENT")
    void create_asStudent_returns403() throws Exception {
        mvc.perform(post("/api/infrastructure")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("POST /api/infrastructure with blank roomOrLabName → 400 Bad Request")
    @WithMockUser(roles = "ADMIN")
    void create_invalidBody_returns400() throws Exception {
        InfrastructureRequestDTO bad = new InfrastructureRequestDTO(
                "",   // @NotBlank violation
                1, "A", 40, true, 0,
                InfrastructureStatus.AVAILABLE,
                InfrastructureType.LABORATORY,
                1L
        );

        mvc.perform(post("/api/infrastructure")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    // ── PUT /api/infrastructure/{id} ─────────────────────────────────────────

    @Test
    @DisplayName("PUT /api/infrastructure/1 as ADMIN → 200 Updated")
    @WithMockUser(roles = "ADMIN")
    void update_asAdmin_returns200() throws Exception {
        InfrastructureResponseDTO updated = new InfrastructureResponseDTO(
                1L, "Lab-103", 1, "A", 40, true, 20,
                InfrastructureStatus.AVAILABLE, InfrastructureType.LABORATORY, "Computer Science"
        );
        when(service.update(eq(1L), any())).thenReturn(updated);

        mvc.perform(put("/api/infrastructure/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(validRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.roomOrLabName", is("Lab-103")));
    }

    // ── DELETE /api/infrastructure/{id} ──────────────────────────────────────

    @Test
    @DisplayName("DELETE /api/infrastructure/1 as ADMIN → 204 No Content")
    @WithMockUser(roles = "ADMIN")
    void delete_asAdmin_returns204() throws Exception {
        doNothing().when(service).delete(1L);

        mvc.perform(delete("/api/infrastructure/1").with(csrf()))
                .andExpect(status().isNoContent());

        verify(service).delete(1L);
    }

    @Test
    @DisplayName("DELETE /api/infrastructure/1 as FACULTY → 403 Forbidden")
    @WithMockUser(roles = "FACULTY")
    void delete_asFaculty_returns403() throws Exception {
        mvc.perform(delete("/api/infrastructure/1").with(csrf()))
                .andExpect(status().isForbidden());

        verifyNoInteractions(service);
    }

    // ── PATCH /api/infrastructure/{id}/status ────────────────────────────────

    @Test
    @DisplayName("PATCH /api/infrastructure/1/status?value=UNDER_MAINTENANCE → 200")
    @WithMockUser(roles = "ADMIN")
    void updateStatus_returns200() throws Exception {
        InfrastructureResponseDTO maintResp = new InfrastructureResponseDTO(
                1L, "Lab-101", 1, "A", 40, true, 20,
                InfrastructureStatus.UNDER_MAINTENANCE, InfrastructureType.LABORATORY, "CS"
        );
        when(service.updateStatus(1L, InfrastructureStatus.UNDER_MAINTENANCE)).thenReturn(maintResp);

        mvc.perform(patch("/api/infrastructure/1/status")
                        .with(csrf())
                        .param("value", "UNDER_MAINTENANCE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UNDER_MAINTENANCE")));
    }

    // ── GET /api/infrastructure/department/{deptId} ───────────────────────────

    @Test
    @DisplayName("GET /api/infrastructure/department/1 → 200 filtered list")
    @WithMockUser
    void getByDepartment_returns200() throws Exception {
        when(service.getByDepartment(1L)).thenReturn(List.of(response1));

        mvc.perform(get("/api/infrastructure/department/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].departmentName", is("Computer Science")));
    }

    // ── GET /api/infrastructure/status/{status} ───────────────────────────────

    @Test
    @DisplayName("GET /api/infrastructure/status/AVAILABLE → 200")
    @WithMockUser
    void getByStatus_returns200() throws Exception {
        when(service.getByStatus(InfrastructureStatus.AVAILABLE)).thenReturn(List.of(response1));

        mvc.perform(get("/api/infrastructure/status/AVAILABLE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status", is("AVAILABLE")));
    }

    // ── GET /api/infrastructure/type/{type} ───────────────────────────────────

    @Test
    @DisplayName("GET /api/infrastructure/type/LABORATORY → 200")
    @WithMockUser
    void getByType_returns200() throws Exception {
        when(service.getByType(InfrastructureType.LABORATORY)).thenReturn(List.of(response1));

        mvc.perform(get("/api/infrastructure/type/LABORATORY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].type", is("LABORATORY")));
    }

    // ── GET /api/infrastructure/block/{block} ─────────────────────────────────

    @Test
    @DisplayName("GET /api/infrastructure/block/A → 200")
    @WithMockUser
    void getByBlock_returns200() throws Exception {
        when(service.getByBlock("A")).thenReturn(List.of(response1));

        mvc.perform(get("/api/infrastructure/block/A"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].block", is("A")));
    }
}
