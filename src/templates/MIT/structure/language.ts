export default {
  type: "Div",
  style: ".container",
  children: [
    {
      type: "Div",
      style: ".row",
      children: [
        {
          type: "Text",
          style: ".title",
          bind: "data.language"
        },
        {
          type: "Text",
          style: ".subtitle",
          bind: "data.proficiency"
        }
      ]
    }
  ]
};
