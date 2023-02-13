module.exports = {
  plugins: [
    new FileManagerPlugin({
     events: {
       onStart: {
         delete: ['dist'],
       },
     },
   }),
  ]
}