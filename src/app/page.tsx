// app/page.tsx
'use client';

import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 2.5rem;
  background-color: #040404;
  background-image: radial-gradient(
    at top center,
    rgba(10, 10, 10, 0.95),
    rgba(0, 0, 0, 1)
  );
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 90rem;
  background-color: rgba(15, 15, 15, 0.95);
  border-radius: 3rem;
  box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.5), 0 40px 80px -40px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.7s, box-shadow 0.7s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.6), 0 40px 80px -40px rgba(0, 0, 0, 0.7);
  }
`;

const Header = styled.header`
  padding: 4rem;
  background-color: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #0b0b0b;
  text-shadow: 0 0 25px rgba(143, 255, 255, 0.8), 0 0 40px rgba(143, 255, 255, 0.6), 0 0 60px rgba(143, 255, 255, 0.4);
  transition: text-shadow 0.7s ease-in-out, transform 0.7s ease-in-out;

  &:hover {
    text-shadow: 0 0 40px rgba(143, 255, 255, 1), 0 0 60px rgba(143, 255, 255, 0.8), 0 0 80px rgba(143, 255, 255, 0.6);
    transform: scale(1.05);
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #b4b4b4;
  margin-top: 2rem;
  transition: color 0.7s ease-in-out, transform 0.7s ease-in-out;

  &:hover {
    color: #d8ff73;
    transform: translateY(-0.5rem);
  }

  @media (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

const TemplatesContainer = styled.div`
  padding: 4rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TemplateCard = styled.div`
  background-color: rgba(20, 20, 20, 0.95);
  padding: 4rem;
  border-radius: 3rem;
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.3), 0 30px 60px -30px rgba(0, 0, 0, 0.4);
  transform-style: preserve-3d;
  transition: transform 0.7s, box-shadow 0.7s;

  &:hover {
    transform: translateY(-1.5rem);
    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 30px 60px -30px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 767px) {
    padding: 3rem;
    border-radius: 2rem;
  }
`;

const TemplateTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #0b0b0b;
  text-shadow: 0 0 25px rgba(143, 255, 255, 0.8), 0 0 40px rgba(143, 255, 255, 0.6), 0 0 60px rgba(143, 255, 255, 0.4);
  transition: text-shadow 0.7s ease-in-out;

  &:hover {
    text-shadow: 0 0 40px rgba(143, 255, 255, 1), 0 0 60px rgba(143, 255, 255, 0.8), 0 0 80px rgba(143, 255, 255, 0.6);
  }

  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

const TemplateDescription = styled.p`
  font-size: 1.25rem;
  color: #b4b4b4;
  margin-top: 2rem;
  transition: color 0.7s ease-in-out;

  &:hover {
    color: #d8ff73;
  }

  @media (max-width: 767px) {
    font-size: 1.125rem;
  }
`;

const PrimaryButton = styled.button`
  display: inline-block;
  background-color: #8fffff;
  color: #040404;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 1.5rem 3rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 25px 40px -15px rgba(0, 0, 0, 0.2), 0 15px 30px -15px rgba(0, 0, 0, 0.15);
  transition: background-color 0.7s ease-in-out, transform 0.7s ease-in-out, box-shadow 0.7s ease-in-out;

  &:hover {
    background-color: #64e9a8;
    transform: scale(1.05);
    box-shadow: 0 40px 80 -20px rgba(0, 0, 0, 0.3), 0 30px 60 -30px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 767px) {
    font-size: 1.125rem;
    padding: 1.25rem 2.5rem;
  }
`;

const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  background-color: rgba(15, 15, 15, 0.95);
  border-radius: 0 0 3rem 3rem;
  box-shadow: 0 -25px 40px -15px rgba(0, 0, 0, 0.2), 0 -15px 30px -15px rgba(0, 0, 0, 0.15);
`;

const FooterText = styled.p`
  font-size: 1.25rem;
  color: #b4b4b4;
  transition: color 0.7s ease-in-out;

  &:hover {
    color: #d8ff73;
  }

  @media (max-width: 767px) {
    font-size: 1.125rem;
  }
`;

const templates = [
    {
        title: 'Executive React Template',
        description: 'A premium and highly performant React template for enterprise-level applications.',
    },
    {
        title: 'Cutting-Edge Native.js Template',
        description: 'A cross-platform mobile app template with advanced features and a sleek design.',
    },
    {
        title: 'Scalable Next.js Template',
        description: 'A robust and scalable Next.js template for building server-rendered web apps.',
    },
    {
        title: 'Innovative Vue.js Template',
        description: 'A modern and feature-rich Vue.js template for building dynamic web applications.',
    },
];

export default function HomePage() {
    const [selectedTemplate, setSelectedTemplate] = useState(0);

    return (
        <Container>
            <Main>
                <Header>
                    <Title>IVES_DEV</Title>
                    <Description>Cutting-edge web development services. Specializing in React, Native.js, and more.</Description>
                </Header>
                <TemplatesContainer>
                    {templates.map((template, index) => (
                        <TemplateCard
                            key={index}
                            onClick={() => setSelectedTemplate(index)}
                            style={{
                                backgroundColor:
                                    index === selectedTemplate
                                        ? 'rgba(143, 255, 255, 0.95)'
                                        : 'rgba(20, 20, 20, 0.95)',
                                color: index === selectedTemplate ? '#040404' : '#b4b4b4',
                            }}
                        >
                            <TemplateTitle>{template.title}</TemplateTitle>
                            <TemplateDescription>{template.description}</TemplateDescription>
                            {index === selectedTemplate && (
                                <PrimaryButton>Buy Template</PrimaryButton>
                            )}
                        </TemplateCard>
                    ))}
                </TemplatesContainer>
                <Footer>
                    <FooterText>&copy; 2024 IVES_DEV. All rights reserved.</FooterText>
                </Footer>
            </Main>
        </Container>
    );
}