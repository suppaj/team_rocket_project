import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  const ContributorCard = ({
    name,
    imageUrl,
    altText,
    githubUrl,
    linkedInUrl,
  }) => {
    return (
      <div
        style={{
          display: "flex",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        <p style={{ marginTop: "1vh", marginRight: "10px" }}>{name}</p>
        {linkedInUrl ? (
          <a href={linkedInUrl} target="_blank" style={{ marginRight: "10px" }}>
            <i className="nes-icon is-medium linkedin"></i>
          </a>
        ) : (
          ""
        )}
        {githubUrl ? (
          <a href={githubUrl} target="_blank" style={{ marginRight: "10px" }}>
            <i className="nes-icon is-medium github"></i>
          </a>
        ) : (
          ""
        )}
        <img
          className="profile-pic"
          src={imageUrl}
          alt={altText}
          height="48px"
          style={{
            borderRadius: "5px",
            border: "2px solid black",
            marginRight: "10px",
          }}
        />
      </div>
    );
  };

  return (
    <footer className="site-footer">
      <div
        className="contributor-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: "1vh",
        }}
      >
        <ContributorCard
          name="Tiff"
          imageUrl="/Jessie-whiteBG.png"
          altText="Jessie Icon"
          linkedInUrl="https://www.linkedin.com/in/tiffanyrkennedy"
          githubUrl="https://github.com/teerkay"
        />
        <ContributorCard
          name="Kyle"
          imageUrl="/James-whiteBG.png"
          altText="James Icon"
          linkedInUrl="https://www.linkedin.com/in/kylhowl"
          githubUrl="https://github.com/kylhowl"
        />
        <ContributorCard
          name="Josh"
          imageUrl="/Meowth-whiteBG.png"
          altText="Meowth Icon"
          linkedInUrl="https://www.linkedin.com/in/josh-suppa"
          githubUrl="https://github.com/suppa-nintendo/"
        />
        <ContributorCard
          name="GitHub"
          imageUrl="/Giovanni-whiteBG.png"
          altText="Giovanni Icon"
          githubUrl="https://github.com/suppa-nintendo/team_rocket_project"
        />
      </div>
      <p
        className="nes-text is-disabled"
        style={{ textAlign: "center", fontSize: ".7rem" }}
      >
        Pokémon and All Respective Names are Trademark & © of Nintendo 1996-2021
      </p>
    </footer>
  );
};

export default Footer;
