import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../ControlledMui/styles.module.css";
import dayjs from "dayjs";
import { red } from "@mui/material/colors";

export interface User {
  login: string;
  email: string;
  password: string;
  gender: string;
  birthDate: Date | null | string;
  socialMedia: { label: string; url: string }[];
}

interface UserCardProps {
  user: User;
  setUserTodelete: React.Dispatch<React.SetStateAction<string>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserCard = ({
  user,
  setUserTodelete,
  setDialogOpen,
}: UserCardProps) => {
  const getIcons = (id: string) => {
    switch (id) {
      case "youtube":
        return <YouTubeIcon />;

      case "github":
        return <GitHubIcon />;

      case "linkedin":
        return <LinkedInIcon />;

      case "instagram":
        return <InstagramIcon />;

      case "facebook":
        return <FacebookIcon />;

      default:
        return null;
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Card sx={{ width: "350px", margin: "12px 12px 0 12px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[700] }} aria-label="avatar">
            {user.login.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={user.login.toUpperCase()}
        subheader={dayjs(user.birthDate).format("MMM D, YYYY")}
        action={
          <IconButton
            onClick={() => {
              setUserTodelete(user.login);
              setDialogOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className={styles.span}>Email:</span> {user.email}
          <br />
          <span className={styles.span}>Gender:</span> {user.gender}
          <br />
          <span className={styles.span}>Password:</span> {user.password}
          <br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user.socialMedia.map((sm) => {
          return (
            <IconButton onClick={() => handleOpenLink(sm.url)}>
              {getIcons(sm.label)}
            </IconButton>
          );
        })}
      </CardActions>
    </Card>
  );
};
