const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    super({ table: "video" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
    video.id AS video_id,
    video.title,
    video.description,
    video.upload_date,
    video.duration,
    video.video_url,
    video.img_url,
    video.access,
    category.name AS category_name,
    GROUP_CONCAT(tag.name SEPARATOR ', ') AS tags
FROM 
    video_tag
JOIN 
    video ON video_tag.video_id = video.id
JOIN 
    tag ON video_tag.tag_id = tag.id
JOIN 
    category ON video.category_id = category.id
WHERE 
    video.user_id = 14
GROUP BY 
    video.id;`
    );
    return rows;
  }

  // SELECT * FROM ${this.table}

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async update(video) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, description=?, upload_date=?, duration=?, video_url=?, img_url=?, category_id=?, user_id=? WHERE id=?`,
      [
        video.title,
        video.description,
        video.upload_date,
        video.duration,
        video.video_url,
        video.img_url,
        video.category_id,
        video.user_id,
        video.id,
      ]
    );

    return result.affectedRows;
  }

  async create(video) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, uplaod_date, duration, video_url, img_url, category_id, user_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        video.title,
        video.description,
        video.upload_date,
        video.duration,
        video.video_url,
        video.img_url,
        video.category_id,
        video.user_id,
      ]
    );

    return result.insertId;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = VideoRepository;
