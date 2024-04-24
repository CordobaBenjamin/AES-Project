import React from "react";
import { useState } from "react";
import { encryptCode } from "../back_functions/encryptFunction";
import { decryptCode } from "../back_functions/decryptFunction";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Typography,
  Grid,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AppStateContext, { useAppState } from "../../../../AppStateContext";

const ThirdStep = () => {
  const { key, error, setError, isLoading, setIsLoading } = useAppState();

  const [inputType, setInputType] = useState("password");

  const changeInput = () => {
    if (inputType === "text") {
      setInputType("password");
    } else setInputType("text");
  };

  return (
    <Grid item sx={{}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mx: "auto",
          width: "100%",
          py: 5,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "140%",
            fontWeight: "bold",
            color: "darkgray",
          }}
        >
          El resultado de su clave compartida:
        </Typography>

        <Box id="hola" sx={{ width: "100%", mx: "auto" }}>
          <Input
            sx={{ width: "100%", fontSize: "120%" }}
            defaultValue={key}
            placeholder={`Pongo su clave aqui`}
            type={inputType}
            readOnly
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={changeInput} edge="end">
                  {changeInput ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <LoadingButton
            loading={isLoading === "cifrar" ? true : false}
            disabled={isLoading === "descifrar"}
            onClick={() => encryptCode(key, setError, setIsLoading)}
            sx={{
              bgcolor: isLoading === "descifrar" ? "white" : "#fff4d6",
              transition: "background-color 0.3 ease",
              "&:hover": { backgroundColor: "white" },
              mt: 2,
              mr: 2,
              width: "100%",
              borderBottom: 3,
              color: "#f1b61c",
              boxShadow: isLoading === "descifrar" ? "-1" : "3",
            }}
          >
            <Typography
              sx={{
                color: isLoading === "descifrar" ? "transparent" : "#b08004",
                fontWeight: "medium",
              }}
              id="end"
            >
              Cifrar Archivo
            </Typography>
          </LoadingButton>

          <LoadingButton
            loading={isLoading === "descifrar" ? true : false}
            disabled={isLoading === "cifrar"}
            onClick={() => decryptCode(key, setError, setIsLoading)}
            sx={{
              bgcolor: isLoading === "cifrar" ? "white" : "#fff4d6",
              transition: "background-color 0.3 ease",
              "&:hover": { backgroundColor: "white" },
              mt: 2,
              ml: 2,
              width: "100%",
              borderBottom: 3,
              color: "#f1b61c",
              boxShadow: isLoading === "cifrar" ? "-1" : "3",
            }}
          >
            <Typography
              sx={{
                color: isLoading === "cifrar" ? "transparent" : "#b08004",
                fontWeight: "medium",
              }}
              id="end"
            >
             Descifrar Archivo
            </Typography>
          </LoadingButton>
        </Box>
        {error && (
          <Box>
            <Typography
              sx={{
                marginTop: "10px",
                color: "#ff0033",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              *{error}
            </Typography>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default ThirdStep;
