export const inputs = [
    {
      name: "position",
      placeholder: "Your position",
      label: "Position:",
    },
    {
      name: "company",
      placeholder: "Name of Company",
      label: "Company:",
    },
    {
      name: "firstName",
      placeholder: "Enter your first name",
      label: "First Name:",
      pattern: "[A-Za-z\\s-]+"
    },
    {
      name: "lastName",
      placeholder: "Enter your last name",
      label: "Last Name:",
      pattern: "[A-Za-z\\s-]+"
    },
    {
      name: "email",
      placeholder: "Your active email",
      label: "Email:",
      type: "email",
    },
    {
      name: "phoneNumber",
      placeholder: "+63",
      label: "Phone Number:",
      type: "tel",
      pattern: "+639[0-9]{9}",
    },
  ]