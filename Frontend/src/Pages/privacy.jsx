import React from "react";
import { Box, Typography } from "@mui/material";

const privacy = () => {
  return (
    <Box
      sx={{
        padding: { xs: "20px", sm: "30px", md: "40px" },
        margin: { xs: "10px", sm: "20px", md: "30px" },
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#2c3e50",
          fontSize: { xs: "2.5rem", md: "3rem" },
          fontWeight: "bold",
        }}
      >
        Privacy Policy
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "1.2rem", marginBottom: "20px" }}
      >
        <strong>Last updated: 1st November, 2024</strong>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        This Privacy Policy explains how Sanidhya collects, uses, discloses, and
        safeguards your information when you visit our website, including any
        other media form, media channel, mobile website, or mobile application
        related or connected thereto our website. Please read this privacy
        policy carefully. If you do not agree with the terms of this privacy
        policy, please do not access the site.
      </Typography>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        1. Information We Collect
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        We may collect information about you in a variety of ways, including:
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Personal Data
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        Personally identifiable information, such as your name, shipping
        address, email address, and telephone number, that you voluntarily give
        to us when you register with the Site or when you choose to participate
        in various activities related to the Site, such as online chat and
        message boards.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Derivative Data
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        Information our servers automatically collect when you access the Site,
        such as your IP address, your browser type, your operating system, your
        access times, and the pages you have viewed directly before and after
        accessing the Site.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Financial Data
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        Financial information, such as data related to your payment method
        (e.g., valid credit card number, card brand, expiration date) that we
        may collect when you purchase, order, return, exchange, or request
        information about our services from the Site.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Data From Social Networks
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        User information from social networking sites, such as Facebook,
        Google+, Twitter, Instagram, LinkedIn, including your name, your social
        network username, location, gender, birth date, email address, profile
        picture, and public data for contacts, if you connect your account to
        such social networks.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Mobile Device Data
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        Device information, such as your mobile device ID, model, and
        manufacturer, and information about the location of your device, if you
        access the Site from a mobile device.
      </Typography>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        2. Use of Your Information
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        Having accurate information about you permits us to provide you with a
        smooth, efficient, and customized experience. Specifically, we may use
        information collected about you via the Site to:
      </Typography>
      <ul>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Create and manage your account.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Process your transactions and send you related information,
            including purchase confirmations and invoices.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Send you emails regarding your account or other products and
            services.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Respond to customer service requests and support needs.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Improve our website and services.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Notify you of updates to the Site.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Monitor and analyze usage and trends to improve your experience with
            the Site.
          </Typography>
        </li>
      </ul>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        3. Disclosure of Your Information
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        We may share information we have collected about you in certain
        situations. Your information may be disclosed as follows:
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        By Law or to Protect Rights
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        If we believe the release of information about you is necessary to
        respond to legal process, to investigate or remedy potential violations
        of our policies, or to protect the rights, property, and safety of
        others, we may share your information as permitted or required by any
        applicable law, rule, or regulation.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Third-Party Service Providers
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        We may share your information with third parties that perform services
        for us or on our behalf, including payment processing, data analysis,
        email delivery, hosting services, customer service, and marketing
        assistance.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Marketing Communications
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        With your consent, or with an opportunity for you to withdraw consent,
        we may share your information with third parties for marketing purposes,
        as permitted by law.
      </Typography>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        4. Tracking Technologies
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "20px", color: "#2980b9" }}>
        Cookies and Web Beacons
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        We may use cookies, web beacons, tracking pixels, and other tracking
        technologies on the Site to help customize the Site and improve your
        experience. When you access the Site, your personal information is not
        collected through the use of tracking technology. Most browsers are set
        to accept cookies by default. You can remove or reject cookies, but be
        aware that such action could affect the availability and functionality
        of the Site.
      </Typography>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        5. Security of Your Information
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that no method of transmission over the Internet or method of electronic
        storage is 100% secure, and we cannot guarantee its absolute security.
      </Typography>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        6. Policy for Children
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        We do not knowingly solicit information from or market to children under
        the age of 13. If we learn that we have collected personal information
        from a child under age 13 without verification of parental consent, we
        will delete that information as quickly as possible. If you become aware
        of any data we have collected from children under age 13, please contact
        us using the contact information provided below.
      </Typography>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        7. Options Regarding Your Information
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        You may at any time review or change the information in your account or
        terminate your account by:
      </Typography>
      <ul>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Logging into your account settings and updating your account.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            Contacting us using the contact information provided below.
          </Typography>
        </li>
      </ul>

      <Typography variant="h4" sx={{ marginTop: "30px", color: "#34495e" }}>
        8. Contact Us
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        If you have questions or comments about this Privacy Policy, please
        contact us at:
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
        Email: <b>sanidhya09205@gmail.com</b>
      </Typography>
    </Box>
  );
};

export default privacy;
