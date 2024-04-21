import * as React from "react";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Grid,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { open, save } from "@tauri-apps/api/dialog";
import {
  init_session,
  end_session,
  continue_session,
  encrypt_file,
  decrypt_file,
} from "../../api/services.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "animate.css";

const steps = ["Primer paso", "Segundo paso", "Tercer paso"];
const words = [
  "azul",
  "rojo",
  "verde",
  "amarillo",
  "naranja",
  "morado",
  "gato",
  "perro",
  "ratón",
  "pájaro",
  "elefante",
  "jirafa",
  "veloz",
  "brillante",
  "suave",
  "fuerte",
  "rápido",
  "lento",
];
const theme = createTheme({
  palette: {
    primary: {
      main: "#f2df28",
    },
  },
});

function randomNameGenerator() {
  const adjetive = words[Math.floor(Math.random() * words.length)];
  const sustantive = words[Math.floor(Math.random() * words.length)];
  const randomNumber = Math.floor(Math.random() * 100);
  return `${adjetive}_${sustantive}_${randomNumber}`;
}

let startTramiteValidation = 1;
let continueTramiteValidation = 2;
console.log(startTramiteValidation);
console.log(continueTramiteValidation);

export default function StepperComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  const [key, setKey] = useState("");
  const [inputType, setInputType] = useState("password");

  const handleNext = () => {
    const newStep =
      currentStep + 1 < steps.length ? currentStep + 1 : currentStep;
    setCurrentStep(newStep);
  };

  const handleSkipStep = () => {
    const newStep =
      currentStep + 2 < steps.length ? currentStep + 2 : currentStep;
    setCurrentStep(newStep);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStartTramite = async () => {
    try {
      let path = await save({
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      let randomName = randomNameGenerator();
      setUserName(randomName);
      if (path == null) setError("Es necesario que seleccione un directorio.");
      else {
        setIsLoading("iniciar");
        await init_session(randomName, path);
        await handleNext();
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleContinueTramite = async () => {
    try {
      let s_path = await open({
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      let c_path = await save({
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      if (s_path | (c_path == null)) {
        setError("Es necesario seleccionar 2 directorios.");
        console.log("null");
      } else {
        setIsLoading("continuar");
        let key = await continue_session(s_path, c_path);
        setKey(key);
        await handleSkipStep();
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleGetCode = async () => {
    try {
      let path = await open({
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      if (path == null) {
        setError("Es necesario seleccionar un directorio.");
        console.log("null");
      } else {
        setIsLoading("recibir");
        let key = await end_session(userName, path);
        setKey(key);
        await handleNext();
      }
    } catch (err) {
      setError(err);
    }
  };

  const encryptCode = async () => {

    try {
      let inputDirectory = await open({
        directory: true,
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      let outputDirectory = await save({
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      if (path == null) {
        setError("Es necesario seleccionar los directorios.");
      } else {
        setIsLoading("encriptar");
        await encrypt_file(inputDirectory, outputDirectory, key);
        // await handleNext()
      }
    } catch (err) {
      setError(err);
    }
  };

  const decryptCode = async () => {
    try {
      let inputDirectory = await open({
        directory: true,
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      let outputDirectory = await save({
        filters: [
          {
            name: "keyex",
            extensions: ["keyex"],
          },
        ],
      });

      if (path == null) {
        setError("Es necesario seleccionar los directorios.");
      } else {
        setIsLoading("encriptar");
        await decrypt_file(inputDirectory, outputDirectory, key);
        // await handleNext()
      }
    } catch (err) {
      setError(err);
    }
  };

  const changeInput = () => {
    if (inputType === "text") {
      setInputType("password");
    } else setInputType("text");
  };

  async function handlePutCode() {}

  const StepButtonAlert = () => {
    alert(`Estas en el paso ${currentStep + 1}`);
  };

  //! Funcion que devuelven los botones segun el paso
  const ButtonStep = ({}) => {
    switch (currentStep) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mx: "auto",
              width: "50%",
              p: 5,
              pt: 4,
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontSize: "", fontWeight: "bold" }}
            >
              Seleccione un archivo para inciar el intercambio.
            </Typography>
            <LoadingButton
              loading={isLoading === "iniciar" ? true : false}
              disabled={isLoading === "continuar"}
              onClick={handleStartTramite}
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
              sx={{ textAlign: "center", fontSize: "", fontWeight: "bold" }}
            >
              Seleccione dos archivo para continuar el intercambio.
            </Typography>

            <LoadingButton
              loading={isLoading === "continuar" ? true : false}
              disabled={isLoading === "iniciar"}
              onClick={handleContinueTramite}
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

      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mx: "auto",
              width: "50%",
              p: 5,
              pt: 4,
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontSize: "", fontWeight: "bold" }}
            >
              Seleccione el archivo recibido para continuar.
            </Typography>
            <LoadingButton
              loading={isLoading === "recibir" ? true : false}
              color="primary"
              onClick={handleGetCode}
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

      case 2:
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
                sx={{ textAlign: "center", fontSize: 16, fontWeight: 800 }}
              >
                El resultado de su clave compartida:
              </Typography>

              <Box id="hola" sx={{ width: "100%", mx: "auto" }}>
                <Input
                  sx={{ width: "100%" }}
                  defaultValue={key}
                  placeholder={`Pongo su clave aqui`}
                  type={inputType}
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
                  loading={isLoading === "terminar" ? true : false}
                  color="primary"
                  onClick={encryptCode}
                  sx={{
                    bgcolor: "#fff4d6",
                    transition: "background-color 0.3 ease",
                    "&:hover": { backgroundColor: "white" },
                    mt: 2,
                    mr: 2,
                    width: "100%",
                    borderBottom: 3,
                    color: "#f1b61c",
                    boxShadow: "3",
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        isLoading === "iniciar" ? "transparent" : "#b08004",
                      fontWeight: "medium",
                    }}
                    id="end"
                  >
                    Cifrar Archivo
                  </Typography>
                </LoadingButton>

                <LoadingButton
                  loading={isLoading === "terminar" ? true : false}
                  color="primary"
                  onClick={decryptCode}
                  sx={{
                    bgcolor: "#fff4d6",
                    transition: "background-color 0.3 ease",
                    "&:hover": { backgroundColor: "white" },
                    mt: 2,
                    ml: 2,
                    width: "100%",
                    borderBottom: 3,
                    color: "#f1b61c",
                    boxShadow: "3",
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        isLoading === "iniciar" ? "transparent" : "#b08004",
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
                      textTransform: "capitalize",
                      letterSpacing: 1,
                    }}
                  >
                    {error}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        );

      default:
        return "No se encontro la variable 'currentStep' Revisar 'ButtonStep'";
    }
  };

  return (
    <Box
      className="main_box_stepper animate__animated animate__pulse animate__fast"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "60%",
        height: "80%",
        margin: "0 auto",
        padding: "5vh",
        boxShadow: "10",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={currentStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                color="#fff4d6"
                onClick={StepButtonAlert}
                className="animate__animated animate__fadeInDown"
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="h5" sx={{ py: 1 }}>
            {currentStep + 1}
          </Typography>

          <Typography variant="h6" sx={{ py: 1, textAlign: "center" }}>
            {steps[currentStep]}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <ButtonStep />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
