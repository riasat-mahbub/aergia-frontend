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
          bind: "data.title"
        },
        {
          type: "Text",
          style: ".date",
          bind: "data.publicationDate"
        }
      ]
    },
    {
      type: "Text",
      style: ".subtitle",
      bind: "data.publisher"
    },
    {
      type: "Html",
      style: ".description",
      bind: "data.description"
    }
  ]
};
