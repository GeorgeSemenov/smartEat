const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
}

//https://stackoverflow.com/questions/52893799/how-to-specify-output-directory-with-mini-css-extract-plugin
//Чтобы положить в отдельную папку файлы - нужно прописать
//plugins: [
//    new MiniCssExtractPlugin({
//      filename: "./css/[name].css"
//    })
//  ]
//Примечание !! - ничего в output теперь менять не нужно, всё само настраивается.

//Чтобы положить всё в одну папку пропиши
//plugins: [
//    new MiniCssExtractPlugin()
//  ]