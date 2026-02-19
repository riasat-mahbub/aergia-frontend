export default {
  type: "Div",
  style: ".container",
  children: [
    {
      type: "Div",
      style: ".titleRow",
      children: [
        {
          type: "Text",
          style: ".title",
          bind: "data.school"
        },
        {
          type: "Date",
          style: ".date",
          startDate: "data.startDate",
          endDate: "data.endDate",
          isCurrent: "data.isCurrentlyStudying",
          if: "data.startDate"
        }
      ]
    },
    {
      type: "Div",
      style: ".subTitleRow",
      children: [
        {
          type: "Text",
          style: ".subtitle",
          bind: "data.degree"
        },
        {
          type: "Text",
          style: ".location",
          bind: "data.location"
        }
      ]
    },
    {
      type: "Text",
      style: ".gpa",
      bind: "data.gpa"
    },
    {
      type: "Html",
      style: ".description",
      bind: "data.description"
    }
  ]
};
