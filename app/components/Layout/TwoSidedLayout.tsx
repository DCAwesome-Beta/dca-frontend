'use client'


import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import { typographyClasses } from '@mui/joy/Typography';


export default function TwoSidedLayout({
  children,
  reversed,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  return (
    <Container
      sx={[
        (theme) => ({
          position: 'relative',
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          py: 10,
          gap: 4,
          flexDirection: reversed ? 'column-reverse' : 'column', // Set flexDirection based on 'reversed' prop
          [theme.breakpoints.up(834)]: {
            flexDirection: 'row',
            gap: 6,
          },
          [theme.breakpoints.up(1199)]: {
            gap: 12,
          },
        }),
      ]}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '50ch',
          textAlign: 'center',
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 420,
            alignItems: 'flex-start',
            textAlign: 'initial',
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: 'balance',
          },
        })}
      >
        {children}
      </Box>
      <AspectRatio
            variant="outlined"
            maxHeight={300}
            sx={(theme) => ({
                minWidth: 300,
                alignSelf: 'stretch',
                [theme.breakpoints.up(834)]: {
                alignSelf: 'initial',
                flexGrow: 1,
                '--AspectRatio-maxHeight': '520px',
                '--AspectRatio-minHeight': '400px',
                },
                borderRadius: 'sm',
                bgcolor: 'background.level2',
                flexBasis: '50%',
                boxShadow: '0 0 40px 5px rgba(126, 71, 255, 0.5)',
            })}
            >
            <img
                src="/Widget.png"
                alt=""
                style={{ display: 'block', width: '100%', height: 'auto' }} // Responsive image
            />
        </AspectRatio>
    </Container>
  );
}