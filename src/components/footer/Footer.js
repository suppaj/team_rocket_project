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
        <a href={linkedInUrl} target="_blank" style={{ marginRight: "10px" }}>
          <i className="nes-icon is-medium linkedin"></i>
        </a>
        <a href={githubUrl} target="_blank" style={{ marginRight: "10px" }}>
          <i className="nes-icon is-medium github"></i>
        </a>
        <img
          className="profile-pic"
          src={imageUrl}
          alt={altText}
          height="48px"
          style={{
            borderRadius: "5px",
            border: "2px solid white",
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

//                 <p>Josh</p>
//                 <a
//                   href="https://www.linkedin.com/in/josh-suppa/"
//                   target="_blank"
//                 >
//                   <i class="nes-icon linkedin"></i>
//                 </a>{" "}
//                 <a href="https://github.com/suppa-nintendo/" target="_blank">
//                   <i class="nes-icon github"></i>
//                 </a>

// const Footer = () => {
//   return (
//     <>
//       <Row
//         className="site-footer justify-content-around"
//         style={{ color: "white" }}
//       >
//         <Col lg={2} med={2} sm={2} className="align-self-center 100vh">
//           <div
//             className="nes-container is-centered is-rounded"
//             style={{ backgroundColor: "#ABBBD1", color: "black" }}
//           >
//             <Col>
//               <a
//                 href="https://github.com/suppa-nintendo/team_rocket_project"
//                 target="_blank"
//                 style={{ textDecoration: "none", color: "white" }}
//               >
//                 <i className="nes-icon github is-large"></i>
//               </a>
//             </Col>
//             <Col>
//               <a
//                 href="https://github.com/suppa-nintendo/team_rocket_project"
//                 target="_blank"
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 Project Code
//               </a>
//             </Col>
//           </div>
//         </Col>
//         <Col lg={2} med={2} sm={2}>
//           <div
//             className="nes-container with-title is-centered is-rounded"
//             style={{ backgroundColor: "#ABBBD1", color: "black" }}
//           >
//             <p
//               className="title nes-container is-rounded"
//               style={{ color: "black" }}
//             >
//               "Jessie"
//             </p>
//             <Row className="align-items-center">
//               <Col>
//                 <img
//                   className="profile-pic"
//                   src="/Jessie-whiteBG.png"
//                   alt="Jessie profile"
//                   height="75vh"
//                   style={{ borderRadius: "50%", border: "2px solid black" }}
//                 />
//               </Col>
//               <Col>
//                 <p>Tiff</p>
//                 <a
//                   href="https://www.linkedin.com/in/tiffanyrkennedy"
//                   target="_blank"
//                 >
//                   <i class="nes-icon linkedin"></i>
//                 </a>{" "}
//                 <a href="https://github.com/teerkay" target="_blank">
//                   <i class="nes-icon github"></i>
//                 </a>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//         <Col lg={2} med={2} sm={2}>
//           <div
//             className="nes-container with-title is-centered is-rounded"
//             style={{ backgroundColor: "#ABBBD1", color: "black" }}
//           >
//             <p
//               className="title nes-container is-rounded"
//               style={{ color: "black" }}
//             >
//               "James"
//             </p>
//             <Row className="align-items-center">
//               <Col>
//                 <img
//                   className="profile-pic"
//                   src="/James-whiteBG.png"
//                   alt="James profile"
//                   height="75vh"
//                   style={{ borderRadius: "50%", border: "2px solid black" }}
//                 />
//               </Col>
//               <Col>
//                 <p>Kyle</p>
//                 <a href="https://www.linkedin.com/in/kylhowl/" target="_blank">
//                   <i class="nes-icon linkedin"></i>
//                 </a>{" "}
//                 <a href="https://github.com/kylhowl" target="_blank">
//                   <i class="nes-icon github"></i>
//                 </a>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//         <Col lg={2} med={2} sm={2}>
//           <div
//             className="nes-container with-title is-centered is-rounded"
//             style={{ backgroundColor: "#ABBBD1", color: "black" }}
//           >
//             <p
//               className="title nes-container is-rounded"
//               style={{ color: "black" }}
//             >
//               "Meowth"
//             </p>
//             <Row className="align-items-center">
//               <Col>
//                 <img
//                   className="profile-pic"
//                   src="/Meowth-whiteBG.png"
//                   alt="Meowth profile"
//                   height="75vh"
//                   style={{ borderRadius: "50%", border: "2px solid black" }}
//                 />
//               </Col>
//               <Col>
//                 <p>Josh</p>
//                 <a
//                   href="https://www.linkedin.com/in/josh-suppa/"
//                   target="_blank"
//                 >
//                   <i class="nes-icon linkedin"></i>
//                 </a>{" "}
//                 <a href="https://github.com/suppa-nintendo/" target="_blank">
//                   <i class="nes-icon github"></i>
//                 </a>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md={11}>
//           <p className="nes-text is-disabled" style={{ fontSize: ".5rem" }}>
//             Nintendo owns the copyright of Pokemon&reg; images. Please comply
//             with the Nintendo guidelines and laws of the applicable
//             jurisdiction.
//           </p>
//         </Col>
//       </Row>
//     </>
//   );
// };

export default Footer;
