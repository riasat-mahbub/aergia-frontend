// A4 paper dimensions in pixels (at 96 DPI)
const A4_WIDTH = 794; // 210mm at 96 DPI
const A4_HEIGHT = 1123; // 297mm at 96 DPI

// Shared styles for both PDF and React components
export const resumeStyles = {
  page: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    width: `${A4_WIDTH}px`,
    height: `${A4_HEIGHT}px`,
    margin: '0 auto',
    fontFamily: 'sans-serif',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    overflow: 'auto',
    position: 'relative' as 'relative',
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  text: {
    fontSize: '12px',
    marginBottom: '5px',
  },
};