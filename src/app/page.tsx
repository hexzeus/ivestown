// pages/index.tsx
'use client';

import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1.5rem 2rem 1.5rem 2rem;
  @media (min-width: 640px) {
    padding: 2rem 3rem 2rem 3rem;
  }
  @media (min-width: 768px) {
    padding: 3rem 4rem 3rem 4rem;
  }
  @media (min-width: 1024px) {
    padding: 4rem 6rem 4rem 6rem;
  }
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 32rem;
  border: 1px solid rgba(0, 255, 0, 0.3);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
  border-radius: 0.5rem;
  background-color: rgba(31, 41, 55, 0.9);
  backdrop-filter: blur(16px);
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 0, 1);
  }
`;

const Section = styled.section`
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #4ade80;
  border-bottom: 4px solid #4ade80;
  padding-bottom: 0.5rem;
  transition: color 0.5s ease-in-out, transform 0.5s ease-in-out;

  &:hover {
    color: #34d399;
    transform: scale(1.05);
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  margin-bottom: 3rem;
  color: #d4d4d4;
  transition: color 0.5s ease-in-out;

  &:hover {
    color: #a3e635;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceCard = styled.div`
  background-color: rgba(31, 41, 55, 0.9);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 255, 0, 0.3);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 0, 1);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #4ade80;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.4);
  transition: text-shadow 0.5s ease-in-out;

  &:hover {
    text-shadow: 0 0 20px rgba(0, 255, 0, 1), 0 0 40px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.6);
  }
`;

const ServiceDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #d4d4d4;
  transition: color 0.5s ease-in-out;

  &:hover {
    color: #a3e635;
  }
`;

const PrimaryButton = styled.a`
  background-color: #4ade80;
  color: #171717;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 9999px;
  transition: background-color 0.5s ease-in-out, transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;

  &:hover {
    background-color: #34d399;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 255, 0, 0.5);
  }
`;

const Footer = styled.footer`
  background-color: rgba(31, 41, 55, 0.9);
  padding: 1rem 0;
  text-align: center;
  border: 1px solid rgba(0, 255, 0, 0.3);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 32rem;
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 0, 1);
  }
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
                <Section>
                    <SectionTitle>IVES_DEV</SectionTitle>
                    <Description>Cutting-edge web development services. Specializing in React and Native.js.</Description>
                </Section>
                <Section>
                    <SectionTitle>Our Services</SectionTitle>
                    <ServiceGrid>
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
                    </ServiceGrid>
                </Section>
            </Main>
            <Footer>
                <FooterText>&copy; 2024 IVES_DEV. All rights reserved.</FooterText>
            </Footer>
        </Container>
    );
}