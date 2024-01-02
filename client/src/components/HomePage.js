import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import {
  getAllCryptoList,
  getAllCurrencies,
  getExchangeRate,
} from "../api/cryptoapi";


const defaultTheme = createTheme();

export default function HomePage() {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("usd");
  const [listOfCrypto, setListOfCrypto] = useState([]);
  const [currencyList, setCurrencyList] = useState(["usd"]);
  const [resultVal, setResultVal] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredSource, setEnteredSource] = useState("");
  const [enteredTarget, setEnteredTarget] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enterAmountError, setEnterAmountError] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [severity, setSeverity] = useState();
  const [sourceErrorMessage, setSourceErrorMessage] = useState("")

  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };
  const handleChangeTarget = (event) => {
    setTarget(event.target.value);
  };

  const fetchExchangeRate = (source, target, amount) => {
    getExchangeRate(source, target, amount)
      .then((res) => {
        setResultVal(res.data);
        setOpen(true);
        setSeverity("success");
        setToastMessage("Exchange Amount received Successfully");
      })
      .catch((err) => {
        setOpen(true);
        setSeverity("error");
        setToastMessage(
          `${err?.response?.data?.error?.message}, Please try after some time`
        );
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (parseInt(data.get("amount")) <= 0 || data.get("amount") === "") {
      setEnterAmountError("Please enter a positive number");
    }else{
      setEnterAmountError("");
    }
    if (!data.get("source")) {
      setSourceErrorMessage("Please choose atleast one option");
    }
    if(data.get("source") && data.get("amount")) {
      fetchExchangeRate({
        source: data.get("source"),
        target: data.get("target"),
        amount: data.get("amount"),
      });
      setEnterAmountError("");
      setSourceErrorMessage("")
      setSource("");
      setTarget("usd");
      event.target.reset();
    }
    setEnteredAmount(data.get("amount"));
    setEnteredSource(data.get("source"));
    setEnteredTarget(data.get("target"));
    setIsSubmitted(true);
    // console.log({
    //   target: data.get("target"),
    //   source: data.get("source"),
    //   amount: data.get("amount"),
    // });
  };

  const fetchCryptoList = () => {
    getAllCryptoList()
      .then((res) => {
        setListOfCrypto(res?.data);
        setOpen(true);
        setSeverity("success");
        setToastMessage("Crypto currency List received Successfully");
      })
      .catch((err) => {
        setOpen(true);
        setSeverity("error");
        setToastMessage(
          `${err?.response?.data?.error?.message}, Please try after some time`
        );
      });
  };
  const fetchCurrenciesList = () => {
    getAllCurrencies()
      .then((res) => {
        setCurrencyList(res?.data);
        setOpen(true);
        setSeverity("success");
        setToastMessage("Currency List received Successfully");
      })
      .catch((err) => {
        setOpen(true);
        setSeverity("error");
        setToastMessage(
          `${err?.response?.data?.error?.message}, Please try after some time`
        );
      });
  };
  useEffect(() => {
    fetchCryptoList();
    fetchCurrenciesList();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        sx={{
          backgroundImage: "url(crypt.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          opacity: 0.9,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <CssBaseline />

        <Box padding={1} marginLeft={6} width={470} height={380}>
          {" "}
          <Box
            fontStyle={"italic"}
            sx={{
              background:
                "linear-gradient(90deg, rgba(133,248,254,1) 0%, rgba(89,191,254,1) 25%, rgba(77,169,240,1) 40%, rgba(19,61,172,1) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
          >
            <Avatar sx={{ m: 1, mt: 2, bgcolor: "#fcf899", color: "black" }}>
              <SwapHorizIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="#fcf899">
              Convertor
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mx: 1 }}
              color="#fcf899"
            >
              {resultVal === undefined ? (
                isSubmitted && <Typography>No Exchange Value Found</Typography>
              ) : (
                <Typography variant="h5" color={"#fff"}>
                  {isSubmitted &&
                    resultVal > 0 &&
                    `${enteredAmount} ${enteredSource} = ${resultVal} ${enteredTarget}`}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Amount"
                type="number"
                id="amount"
                onFocus={() => {
                  setIsSubmitted(false);
                  setResultVal(0);
                }}
                InputProps={{ inputProps: { min: 0 } }}
                error={isSubmitted && enterAmountError}
                helperText={isSubmitted && enterAmountError}
                // inputProps={{ style: { borderRadius: '10px' } }}
                // autoComplete="current-password"
              />
              <FormControl fullWidth>
                <InputLabel id="source-select">Source</InputLabel>
                <Select
                  labelId="source-select"
                  id="source-select"
                  value={source}
                  name="source"
                  label="Source"
                  required
                  onChange={handleChangeSource}
                  error={isSubmitted && !enteredSource}
                >
                  {listOfCrypto?.length ? (
                    listOfCrypto.map((name) => {
                      return (
                        <MenuItem key={name.id} value={name.id}>
                          {name.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem>Waiting for data....</MenuItem>
                  )}
                </Select>
                {isSubmitted && !source && (
                  <FormHelperText error>
                    {sourceErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: "8px" }}>
                <InputLabel id="target-select">Target</InputLabel>
                <Select
                  labelId="target-select"
                  id="target-select"
                  name="target"
                  value={target}
                  label="Target"
                  required
                  onChange={handleChangeTarget}
                >
                  {currencyList?.length &&
                    currencyList.map((name) => {
                      const printName = name.toUpperCase();
                      return (
                        <MenuItem key={name} value={name}>
                          {printName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Convert
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={toastMessage}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert severity={severity}>{toastMessage}</Alert>
              </Snackbar>
            </Box>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
