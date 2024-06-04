import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h3" gutterBottom>
        Hi,Welcome back 👋
      </Typography>

      <Typography variant="body2">
        If you are going to use a passage of Lorem Ipsum, you need to be sure
        there isn't anything.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" color="success">
        Go Now
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{ backgroundColor: "#e0f2f1" }}>
        {card}
      </Card>
    </Box>
  );
}
