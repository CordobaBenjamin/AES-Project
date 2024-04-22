import React from 'react'
import { handleGetCode } from "../back_fn/recibir_tramite";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Typography,
} from "@mui/material";
import AppStateContext, {useAppState} from '../../../../AppStateContext';

const Second_step = () => {

    const {
      setCurrentStep,
      setKey,
      userName,
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
            p: 5,
            pt: 4,
          }}
        >
          <Typography
             sx={{ textAlign: "center", fontSize: "140%", fontWeight: "bold", color: "gray"}}
          >
            Seleccione el archivo recibido para continuar.
          </Typography>
          <LoadingButton
            loading={isLoading === "recibir" ? true : false}
            color="primary"
            onClick={() => handleGetCode(setKey, setError, setIsLoading, setCurrentStep, userName)}
            sx={{
              bgcolor: "#fff4d6",
              transition: "background-color 0.3 ease",
              "&:hover": { backgroundColor: "white" },
              mt: 2,
              width: "100%",
              borderBottom: 3,
              color: "#f1b61c",
              boxShadow: "3",
            }}
          >
            <Typography
              sx={{
                color: isLoading === "recibir" ? "transparent" : "#b08004",
                fontWeight: "medium",
              }}
              id="get"
            >
              Recibió el Código?
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
}

export default Second_step