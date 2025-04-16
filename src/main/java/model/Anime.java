package model;

// 动漫资料的存储模型

/**
 * ClassName: Anime
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/14 17:03
 */

public class Anime {
    private int id;
    private String title;
    private String releaseYear; // 修改为 String
    private String episodes;    // 修改为 String
    private String author;
    private String imageUrl;
    private String image2Url;
    private String description;
    private String url;

    public Anime() {
    }

    public Anime(int id, String title, String releaseYear, String episodes, String author, String imageUrl, String image2Url, String description, String url) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.episodes = episodes;
        this.author = author;
        this.imageUrl = imageUrl;
        this.image2Url = image2Url;
        this.description = description;
        this.url = url;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(String releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getEpisodes() {
        return episodes;
    }

    public void setEpisodes(String episodes) {
        this.episodes = episodes;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImage2Url() {
        return image2Url;
    }

    public void setImage2Url(String image2Url) {
        this.image2Url = image2Url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String toString() {
        return "Anime{id = " + id + ", title = " + title + ", releaseYear = " + releaseYear + ", episodes = " + episodes + ", author = " + author + ", imageUrl = " + imageUrl + ", image2Url = " + image2Url + ", description = " + description + ", url = " + url + "}";
    }
}
