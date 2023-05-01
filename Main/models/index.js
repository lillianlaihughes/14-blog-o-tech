const Writer = require('./Writer');
const Article = require('./Article');
const Commenter = require('./Comment');
const Comment = require('./Comment');

Writer.hasMany(Article, {
  foreignKey: 'writer_id',
  onDelete: 'CASCADE',
});

Article.belongsTo(Writer, {
  foreignKey: 'writer_id',
});

Writer.hasMany(Comment, {
  foreignKey: 'writer_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Writer, {
  foreignKey: 'writer_id',
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id',
});

module.exports = { Writer, Article, Comment };
