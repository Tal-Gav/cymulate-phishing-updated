import { Typography, useTheme } from "@mui/material";

const Title = () => {
  const theme = useTheme();

  return (
    <Typography
      fontFamily={"Segoe UI"}
      fontWeight={"bold"}
      letterSpacing={2}
      variant="h2"
      color={theme.palette.primary.main}
    >
      Phishing Management
    </Typography>
  );
};

export default Title;
