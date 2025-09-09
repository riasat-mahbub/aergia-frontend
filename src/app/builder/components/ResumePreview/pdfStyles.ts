import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  // Profile Section
  profileContainer: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContact: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  profileContactItem: {
    fontSize: 10,
    marginRight: 8,
  },
  profileSummary: {
    fontSize: 10,
    marginTop: 8,
    textAlign: 'justify',
  },

  // Section Titles
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: 1,
  },

  // Common Form Styles
  formContainer: {
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  formDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formDate: {
    fontSize: 10,
  },
  formDateSeperator: {
    fontSize: 10,
  },
  formSubtitle: {
    fontSize: 11,
  },
  formLocation: {
    fontSize: 10,
  },
  formDescription: {
    fontSize: 10,
    marginTop: 4,
  },

  spaceBetween: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },

  // Skills specific
  skillsContainer: {
    marginBottom: 8,
  },
  skillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 11,
    marginRight: 8,
  },
  skillRating: {
    fontSize: 10,
  },
  skillDescription: {
    fontSize: 10,
    marginTop: 2,
  },

  // Education section
  educationGPA: {
    fontSize: 10,
  },
});