// chakra imports
import { Box, Center, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { withApollo } from "utils/hooks/withApollo";

import { LoginCover } from "@/components/Login/LoginCover";
import { LoginForm } from "@/components/Login/LoginForm";

const pageContent: { [index: string]: any } = {
  "en-us": {
    login: {
      title: "Login",
      description: "Sign in to your account",
      email: "Email",
      password: "Password",
      forgot: "Forgot Password",
      stay_signed: "Stay signed in for a week",
      button: "Continue",
    },
    loginValidation: {
      invalid_email: "Invalid email address",
      email_required: "Please enter your email address",
      pass1_required: "Please enter your password",
    },
    register: {
      title: "Register",
      description: "Create a new account",
      email: "Email",
      password: "Password",
      password_confirmation: "Password Confirmation",
      referrer_email: "Referrer Email",
      referrer_placeholder: "Email address (optional)",
      checkbox:
        "Get emails from Lead Monkey about product updates, industry news, and events. If you change your mind, you can unsubscribe at any time. Continue",
      button: "Continue",
    },
    registerValidation: {
      invalid_email: "Invalid email address",
      email_required: "Please enter your email address",
      invalid_password1: "password must be at least 8 characters",
      pass1_required: "Please enter your password",
      invalid_password2: "Your password does not match",
      invalid_referrer: "Invalid referrer email address",
    },
  },
  de: {
    login: {
      title: "Anmeldung",
      description: "Melden Sie sich bei Ihrem Konto an",
      email: "Email",
      password: "Passwort",
      forgot: "Passwort vergessen",
      stay_signed: "Bleiben Sie eine Woche angemeldet",
      button: "Weitermachen",
    },
    loginValidation: {
      invalid_email: "Ungültige E-Mail-Adresse",
      email_required: "Geben Sie bitte Ihre Email-Adresse ein",
      pass1_required: "Bitte geben Sie Ihr Passwort ein",
    },
    register: {
      title: "Registrieren",
      description: "Ein neues Konto erstellen",
      email: "Email",
      password: "Passwort",
      password_confirmation: "Passwort Bestätigung",
      referrer_email: "Empfehlungs-E-Mail",
      referrer_placeholder: "E-Mail-Adresse (fakultativ)",
      checkbox:
        "Erhalten Sie E-Mails von Lead Monkey über Produktupdates, Branchennachrichten und Veranstaltungen. Wenn Sie Ihre Meinung ändern, können Sie sich jederzeit wieder abmelden. Weitermachen",
      button: "Weitermachen",
    },
    registerValidation: {
      invalid_email: "Ungültige E-Mail-Adresse",
      email_required: "Geben Sie bitte Ihre Email-Adresse ein",
      invalid_password1: "Passwort muss mindestens 8 Zeichen lang sein",
      pass1_required: "Bitte geben Sie Ihr Passwort ein",
      invalid_password2: "Ihr Passwort stimmt nicht überein",
      invalid_referrer: "Ungültige Referrer-E-Mail-Adresse",
    },
  },
};

const Login: NextPage = () => {
  const router = useRouter();
  const locale: string = router.locale ? router.locale : "en-US";
  const content = pageContent[locale];
  return (
    <Box w="100%">
      <Flex minH={{ base: "auto", md: "100vh" }}>
        <Flex maxW="8xl" mx="auto" width="full">
          <LoginCover />
          <Center flex="1">
            <LoginForm
              px={{ base: "4", md: "8" }}
              py={{ base: "12", md: "48" }}
              width="full"
              maxW="md"
              loginLabels={content.login}
              validation={content.loginValidation}
            />
          </Center>
        </Flex>
      </Flex>
    </Box>
  );
};

export default withApollo(Login);
