package model;

/**
 * ClassName: SimpleAnime
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/30 12:40
 */

public class SimpleAnime {
    private int id;
    private String title;
    private String releaseYear; // 修改为 String
    private String episodes;    // 修改为 String
    private String author;
    private String imageUrl;

    public SimpleAnime() {
    }

    public SimpleAnime(int id, String title, String releaseYear, String episodes, String author, String imageUrl) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.episodes = episodes;
        this.author = author;
        this.imageUrl = imageUrl;
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

    public String toString() {
        return "SimpleAnime{id = " + id + ", title = " + title + ", releaseYear = " + releaseYear + ", episodes = " + episodes + ", author = " + author + ", imageUrl = " + imageUrl + "}";
    }
}
