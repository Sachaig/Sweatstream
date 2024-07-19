const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    super({ table: "video" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

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
        video.access,
        video.category_id,
        video.user_id,
        video.id,
      ]
    );

    return result.affectedRows;
  }

  async create(video) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, duration, video_url, access, category_id, user_id) VALUES (?,?,?,?,?,?,?)`,
      [
        video.title,
        video.description,
        video.duration,
        video.video_url,
        video.access,
        video.category_id,
        video.user_id,
      ]
    );

    // for (const tag of video.tags_id) {
    //   const [junctionResult] = this.database.query(
    //     `INSERT INTO video_tag (video_id, tag_id) VALUES (?,?)`,
    //     [result.insertId, tag]
    //   );
    // }

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
