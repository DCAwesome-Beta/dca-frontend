/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../../components/Layout/TwoSidedLayout';

export default function Home() {
  return (
    <TwoSidedLayout>
      <div  className='landing-container'>
        {/* <Typography sx={{ fontSize: 'lg', fontWeight: 'lg', color: '#fff' }}>
          The power to do more
        </Typography> */}
        <Typography
          level="h1"
          sx={{
            fontWeight: 'xl',
            fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
            color: 'white'
          }}
        >
          Your Cross-Chain decentralized DCA platform
        </Typography>
        <Typography
          textColor="text.secondary"
          sx={{ fontSize: 'lg', lineHeight: 'lg', color: '#ffffff90' }}
        >
          Create personalized, automated cryptocurrency investment strategies across multiple chains
        </Typography>
        <Link href='/signup'>
            <Button size="lg"
                className='hero-cta'
                sx={{
                    backgroundColor: '#7E47FF', // Set your desired background color
                    color: 'white', // Set your desired text color
                    '&:hover': {
                        backgroundColor: '#6F35F5', // Change color on hover
                    },
                }}
                endDecorator={<ArrowForward fontSize="large"
            />}>
            Get Started
            </Button>
        </Link>
        
        <Typography sx={{  color: '#ffffff60' }}>
          Already a member? <Link href="/signin" sx={{ fontWeight: 'lg', color: '#9060FF', textDecoration: 'none', // Remove the default underline
            '&:hover': {
                textDecoration: 'underline', // Add underline on hover
                textDecorationColor: '#yourHoverColor', // Set custom underline color
            }, }}>Sign in</Link>
        </Typography>
      </div>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
      </Typography>
    </TwoSidedLayout>
  );
}