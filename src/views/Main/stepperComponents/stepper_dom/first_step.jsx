import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { handleStart } from "../back_functions/handleStart";
import { handleContinue } from "../back_functions/handleContinueTramite";
import AppStateContext, { useAppState } from "../../../../AppStateContext";

const FirstStep = () => {
  const {
    setCurrentStep,
    setKey,
    setUserName,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useAppState();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mx: "auto",
        width: "70%",
        p: 4,
        py: 5,
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "120%", fontWeight: "bold", color: "gray"}}
      >
        Seleccione un archivo para inciar el intercambio.
      </Typography>
      <LoadingButton
        loading={isLoading === "iniciar" ? true : false}
        disabled={isLoading === "continuar"}
        onClick={() =>
          handleStart(
            setError,
            setUserName,
            setIsLoading,
            setCurrentStep
          )
        }
        variant=""
        sx={{
          bgcolor: isLoading === "continuar" ? "white" : "#fff4d6",
          transition: "background-color 0.3 ease",
          "&:hover": { backgroundColor: "white" },
          mt: 1,
          mb: 2,
          width: "100%",
          borderBottom: 3,
          color: "#f1b61c",
          boxShadow: isLoading === "continuar" ? "-1" : "3",
        }}
      >
        <Typography
          sx={{
            color:
              isLoading === "iniciar"
                ? "transparent"
                : isLoading === "continuar"
                ? "#000"
                : "#b08004",
            fontWeight: "medium",
          }}
          id="start"
        >
          Iniciar intercambio
        </Typography>
      </LoadingButton>

      <Typography
         sx={{ textAlign: "center", fontSize: "120%", fontWeight: "bold", color: "gray", mt: 1}}
      >
        Seleccione dos archivo para continuar el intercambio.
      </Typography>

      <LoadingButton
        loading={isLoading === "continuar" ? true : false}
        disabled={isLoading === "iniciar"}
        onClick={() =>
          handleContinue(setKey, setError, setIsLoading, setCurrentStep)
        }
        variant=""
        sx={{
          bgcolor: isLoading === "iniciar" ? "white" : "#fff4d6",
          transition: "background-color 0.3 ease",
          "&:hover": { backgroundColor: "white" },
          mt: 1,
          width: "100%",
          borderBottom: 3,
          color: "#f1b61c",
          boxShadow: isLoading === "iniciar" ? "-1" : "3",
        }}
      >
        <Typography
          sx={{
            color:
              isLoading === "continuar"
                ? "transparent"
                : isLoading === "iniciar"
                ? "#000"
                : "#b08004",
            fontWeight: "medium",
          }}
          id="continue"
        >
          Continuar intercambio
        </Typography>
      </LoadingButton>

      {error && (
            <Box>
              <Typography
                sx={{
                  marginTop: "10px",
                  color: "#ff0033",
                  textTransform: "capitalize",
                  letterSpacing: 1,
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
    </Box>
  );
};

export default FirstStep;
