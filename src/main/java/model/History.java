package model;

/**
 * ClassName: History
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/29 12:15
 */

public class History {
    private int div_id; // 修改为 int 类型
    private String date;
    private String name;
    private String url;

    public History(int div_id, String date, String name, String url) {
        this.div_id = div_id;
        this.date = date;
        this.name = name;
        this.url = url;
    }


    public History() {
    }

    public int getDiv_id() {
        return div_id;
    }

    public void setDiv_id(int div_id) {
        this.div_id = div_id;
    }


    public String getDate() {
        return date;
    }


    public void setDate(String date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String toString() {
        return "History{div_id = " + div_id + ", date = " + date + ", name = " + name + ", url = " + url + "}";
    }
}
