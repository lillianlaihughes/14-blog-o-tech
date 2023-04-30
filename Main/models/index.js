const Writer = require("./Writer");
const Article = require("./Article");

Writer.hasMany(Article, {
  foreignKey: "writer_id",
  onDelete: "CASCADE",
});

Article.belongsTo(Writer, {
  foreignKey: "writer_id",
});

module.exports = { Writer, Article };
