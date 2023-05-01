const Writer = require("./Writer");
const Article = require("./Article");
const Commenter = require('./Comment');
const Comment = require('./Comment');

Writer.hasMany(Article, {
  foreignKey: "writer_id",
  onDelete: "CASCADE",
});

Article.belongsTo(Writer, {
  foreignKey: "writer_id",
});

Commenter.hasMany(Comment, {
  foreignKey: "commenter_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Commenter, {
  foreignKey: "commenter_id",
});

Article.hasMany(Comment, {
  foreignKey: "article_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Article, {
  foreignKey: "article_id",
})

module.exports = { Writer, Article, Commenter, Comment };
