/** @jsxImportSource @emotion/react */
'use client';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const staggeredFadeIn = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const fadeAnimation = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const ParticleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const Particle = styled.div<{ duration: number }>`
  position: absolute;
  background-color: rgba(255, 215, 0, 0.2);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: ${props => css`
    ${floatAnimation} ${props.duration}s infinite ease-in-out,
    ${fadeAnimation} ${props.duration}s infinite ease-in-out
  `};
`;

function ParticleSystem() {
    const particles = Array.from({ length: 20 }, (_, i) => (
        <Particle
            key={i}
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
            }}
            duration={Math.random() * 10 + 5}
        />
    ));

    return <ParticleBackground>{particles}</ParticleBackground>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom, #000000, #1a1a1a);
  position: relative;
  transition: all 0.5s ease;
`;

const Logo = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: transparent;
  background: linear-gradient(45deg, #ffd700, #f0f0f0);
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out;
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0;
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-out 0.3s backwards;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  animation: ${fadeIn} 1s ease-out 0.6s backwards;
`;

const TemplateCard = styled.div<{ index: number }>`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  opacity: 0;
  animation: ${staggeredFadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.index * 0.1}s;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: ${shimmer} 3s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.5);
    background-color: rgba(255, 215, 0, 0.1);

    &:before {
      opacity: 1;
    }
  }
`;

const TemplateTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const TemplateDescription = styled.p`
  font-size: 1rem;
  color: #a0a0a0;
  position: relative;
  z-index: 1;
`;

const BuyButton = styled.button`
  background: linear-gradient(45deg, #ffd700, #ffec8b);
  color: #000000;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    &:before {
      left: 100%;
    }
  }
`;

const Footer = styled.footer`
  font-size: 0.9rem;
  color: #a0a0a0;
  text-align: center;
  margin-top: 3rem;
  animation: ${fadeIn} 1s ease-out 0.9s backwards;
`;

const templates = [
    {
        title: 'Executive React',
        description: 'Premium enterprise-level React template for industry leaders',
    },
    {
        title: 'Elite Native.js',
        description: 'Cutting-edge cross-platform mobile app template for visionaries',
    },
    {
        title: 'Pinnacle Next.js',
        description: 'Scalable server-rendered web app solution for global innovators',
    },
    {
        title: 'Avant-garde Vue.js',
        description: 'Innovative template for dynamic web applications that redefine excellence',
    },
];

export default function HomePage() {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Container>
            <ParticleSystem />
            <div>
                <Logo>IVES_DEV</Logo>
                <Tagline>Exclusive web development solutions for the elite visionary</Tagline>
            </div>
            <TemplateGrid>
                {templates.map((template, index) => (
                    <TemplateCard
                        key={index}
                        index={index}
                        onClick={() => setSelectedTemplate(index)}
                    >
                        <TemplateTitle>{template.title}</TemplateTitle>
                        <TemplateDescription>{template.description}</TemplateDescription>
                        {selectedTemplate === index && (
                            <BuyButton>Acquire Excellence</BuyButton>
                        )}
                    </TemplateCard>
                ))}
            </TemplateGrid>
            <Footer>&copy; 2024 IVES_DEV. Redefining digital luxury.</Footer>
        </Container>
    );
}