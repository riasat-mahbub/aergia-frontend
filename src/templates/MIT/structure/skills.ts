export default {
  type: "Div",
  style: ".container",
  children: [
    {
      type: "Text",
      style: ".category",
      bind: "data.category"
    },
    {
      type: "Html",
      style: ".description",
      bind: "data.description"
    }
  ]
};
