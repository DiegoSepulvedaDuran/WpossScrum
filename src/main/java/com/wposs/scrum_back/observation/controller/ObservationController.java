package com.wposs.scrum_back.observation.controller;

import com.wposs.scrum_back.Exception.exceptions.MethodArgumentNotValidException;
import com.wposs.scrum_back.observation.dto.ObservationDto;
import com.wposs.scrum_back.observation.service.ObersvationService;
import com.wposs.scrum_back.utils.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/observation")
public class ObservationController {
    @Autowired
    private ObersvationService obersvationService;
    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("/all")
    @Operation(summary = "Get All Observation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Get All Success"),
            @ApiResponse(responseCode = "400",description = "")
    })
    public ResponseEntity<List<ObservationDto>> getAllObservation(@RequestHeader(value="Authorization") String token) {
        try{
            if(jwtUtil.getKey(token) != null) {
                List<ObservationDto> observationDtos = obersvationService.getAllObservation();
                if (!observationDtos.isEmpty()) {
                    return new ResponseEntity<>(observationDtos, HttpStatus.OK);
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.badRequest().build();
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
    }

    @PostMapping("/saveobservation")
    @Operation(summary = "Save Observation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Save Success"),
            @ApiResponse(responseCode = "400",description = "Error JSON")
    })
    public ResponseEntity<ObservationDto> saveObservation(@Valid @RequestBody ObservationDto observationDto, BindingResult result,@RequestHeader(value="Authorization") String token){
        try{
            if(jwtUtil.getKey(token) != null) {
                if (result.hasErrors()){
                    throw new MethodArgumentNotValidException("ERROR en el JSON: "+result.getFieldError().getRejectedValue(),"400",HttpStatus.BAD_REQUEST);
                }
                return new ResponseEntity<>(obersvationService.saveObservation(observationDto),HttpStatus.CREATED);
            }
            return ResponseEntity.badRequest().build();
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
    }
}
