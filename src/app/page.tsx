// app/page.tsx
'use client';

import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1.5rem 2rem;
  background-color: #0f172a;
  background-image: radial-gradient(
    ellipse at center,
    rgba(15, 23, 42, 0.8) 0%,
    rgba(15, 23, 42, 1) 100%
  );
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 48rem;
  background-color: rgba(30, 41, 59, 0.9);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.5s, box-shadow 0.5s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  }
`;

const Header = styled.header`
  padding: 2rem;
  background-color: rgba(51, 65, 85, 0.9);
  backdrop-filter: blur(8px);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #4ade80;
  text-shadow: 0 0 10px rgba(68, 238, 68, 0.8), 0 0 20px rgba(68, 238, 68, 0.6), 0 0 30px rgba(68, 238, 68, 0.4);
  transition: text-shadow 0.5s ease-in-out, transform 0.5s ease-in-out;

  &:hover {
    text-shadow: 0 0 20px rgba(68, 238, 68, 1), 0 0 40px rgba(68, 238, 68, 0.8), 0 0 60px rgba(68, 238, 68, 0.6);
    transform: scale(1.05);
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #d4d4d4;
  margin-top: 1rem;
  transition: color 0.5s ease-in-out, transform 0.5s ease-in-out;

  &:hover {
    color: #a3e635;
    transform: translateY(-0.25rem);
  }
`;

const ServicesContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceCard = styled.div`
  background-color: rgba(51, 65, 85, 0.9);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform-style: preserve-3d;
  transition: transform 0.5s, box-shadow 0.5s;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08);
  }
`;

const ServiceTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #4ade80;
  text-shadow: 0 0 10px rgba(68, 238, 68, 0.8), 0 0 20px rgba(68, 238, 68, 0.6), 0 0 30px rgba(68, 238, 68, 0.4);
  transition: text-shadow 0.5s ease-in-out;

  &:hover {
    text-shadow: 0 0 20px rgba(68, 238, 68, 1), 0 0 40px rgba(68, 238, 68, 0.8), 0 0 60px rgba(68, 238, 68, 0.6);
  }
`;

const ServiceDescription = styled.p`
  font-size: 1.125rem;
  color: #d4d4d4;
  margin-top: 1rem;
  transition: color 0.5s ease-in-out;

  &:hover {
    color: #a3e635;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background-color: #4ade80;
  color: #0f172a;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.5s ease-in-out, transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;

  &:hover {
    background-color: #34d399;
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const Footer = styled.footer`
  padding: 1rem 0;
  text-align: center;
  background-color: rgba(30, 41, 59, 0.9);
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const FooterText = styled.p`
  color: #d4d4d4;
  transition: color 0.5s ease-in-out;

  &:hover {
    color: #a3e635;
  }
`;

export default function HomePage() {
    return (
        <Container>
            <Main>
                <Header>
                    <Title>IVES_DEV</Title>
                    <Description>Cutting-edge web development services. Specializing in React and Native.js.</Description>
                </Header>
                <ServicesContainer>
                    <ServiceCard>
                        <ServiceTitle>React Development</ServiceTitle>
                        <ServiceDescription>
                            Scalable and efficient web applications with seamless user experiences.
                        </ServiceDescription>
                        <PrimaryButton href="#">Learn More</PrimaryButton>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceTitle>Native.js Development</ServiceTitle>
                        <ServiceDescription>
                            High-performance mobile apps for iOS and Android platforms.
                        </ServiceDescription>
                        <PrimaryButton href="#">Learn More</PrimaryButton>
                    </ServiceCard>
                </ServicesContainer>
                <Footer>
                    <FooterText>&copy; 2024 IVES_DEV. All rights reserved.</FooterText>
                </Footer>
            </Main>
        </Container>
    );
}