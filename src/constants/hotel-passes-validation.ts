const validation = {
  image: {
    required: 'This field is required',
  },
  type: {
    required: 'This field is required',
    pattern: { value: /(^Family$|^Tranquil$|^Festive)$/g, message: `'Family' or 'Tranquil' or 'Festive' is required` }
  },
  title: {
    required: 'This field is required',
  },
  passType: {
    required: 'This field is required',
  },
  location: {
    required: 'This field is required',
  },
  ratingPercentage: {
    required: 'This field is required',
    max: { value: 100, message: 'Max value 100' },
    min: { value: 0, message: 'Min value 0' },
  },
  ratingAmount: {
    required: 'This field is required',
  },
  price: {
    required: 'This field is required',
  },
};

export default validation;
