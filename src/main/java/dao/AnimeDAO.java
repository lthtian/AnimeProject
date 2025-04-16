package dao;

// 该层读入远程数据库数据

/**
 * ClassName: AnimeDAO
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/14 17:03
 */

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Anime;
import model.History;
import model.SimpleAnime;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.sql.Timestamp;

import java.sql.*;
import java.util.Optional;

public class AnimeDAO {
    private final String URL = "jdbc:mysql://82.156.254.74:3306/Anime?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai";
    private final String USER = "lth";
    private final String PASSWORD = "040915ly";


    // 依据传入的id向数据库调用对应的动漫资源, 返回一个包含资源的json字符串

    public String getAnimeById(int id) {

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 启动引擎
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 连接建立数据库对象
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            //创建执行sql语句的对象
            stmt = conn.createStatement();
            // 书写sql的String语句, 查看返回结果
            String sql = "SELECT * FROM anime where id = " + id;
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Anime anime = new Anime();
                anime.setId(rs.getInt("id"));
                anime.setTitle(rs.getString("name"));
                anime.setReleaseYear(rs.getString("year"));
                anime.setEpisodes(rs.getString("episodes"));
                anime.setAuthor(rs.getString("author"));
                anime.setImageUrl(rs.getString("image1_path"));
                anime.setImage2Url(rs.getString("image2_path"));
                anime.setDescription(rs.getString("description"));
                anime.setUrl(rs.getString("url"));

                ObjectMapper mapper = new ObjectMapper();
                String jsonString = mapper.writeValueAsString(anime);

                return jsonString;
            }

            rs.close();
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return "";
    }

    // 将传入的用户名和密码插入数据库中的user表, 返回是否注册成功

    public String setUser(String name, String pass) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            // 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立连接
            conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // 书写 SQL 语句，使用占位符
            String sql = "INSERT INTO users (username, password) VALUES (?, ?)";

            // 创建 PreparedStatement 对象
            pstmt = conn.prepareStatement(sql);

            // 设置占位符的值
            pstmt.setString(1, name);
            pstmt.setString(2, pass);

            // 执行 SQL 语句
            int rows = pstmt.executeUpdate();

            // 关闭资源
            pstmt.close();
            conn.close();

            if (rows > 0) {
                return "{\"success\": true}";
            } else {
                return "{\"success\": false, \"message\": \"未插入任何数据\"}";
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "{\"success\": false, \"message\": \"驱动加载失败\"}";
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"success\": false, \"message\": \"用户名已存在或数据库错误\"}";
        }
    }

    // 依据传来的用户名和密码向数据库user表中查询有无对应的记录, 如果有就返回true, 反之返回false

    public String getLoginInfo(String name, String pass) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            // 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立连接
            conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // 书写 SQL 语句，使用占位符
            String sql = "SELECT id FROM users WHERE username = ? AND password = ?";

            // 创建 PreparedStatement 对象
            pstmt = conn.prepareStatement(sql);

            // 设置占位符的值
            pstmt.setString(1, name);
            pstmt.setString(2, pass);

            // 执行 SQL 语句
            rs = pstmt.executeQuery();

            if (rs.next()) {
                // 关闭资源
                rs.close();
                pstmt.close();
                conn.close();
                return "{\"success\": true}";
            } else {
                // 关闭资源
                rs.close();
                pstmt.close();
                conn.close();
                return "{\"success\": false, \"message\": \"用户名或密码错误\"}";
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "{\"success\": false, \"message\": \"驱动加载失败\"}";
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"success\": false, \"message\": \"服务器错误\"}";
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


    // 依据用户名和divid除去该用户在数据库浏览记录表中对应的历史记录

    public void removeHistory(String username, int div_id) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            // 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立连接
            conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // 书写 SQL 语句，使用占位符
            String sql = "delete from browsing_history where username = ? and div_id = ?";

            // 创建 PreparedStatement 对象
            pstmt = conn.prepareStatement(sql);

            // 设置占位符的值
            pstmt.setString(1, username);
            pstmt.setInt(2, div_id);

            int rows = pstmt.executeUpdate();

            // 关闭资源
            pstmt.close();
            conn.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    // 根据传入的名称和divid将浏览记录插入数据库, 返回是否插入成功

    public String setHistory(String username, int div_id) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            // 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立连接
            conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // 书写 SQL 语句，使用占位符
            String sql = "INSERT INTO browsing_history (username, div_id) VALUES (?, ?)";

            // 创建 PreparedStatement 对象
            pstmt = conn.prepareStatement(sql);

            // 设置占位符的值
            pstmt.setString(1, username);
            pstmt.setInt(2, div_id);

            int rows = pstmt.executeUpdate();

            // 关闭资源
            pstmt.close();
            conn.close();

            if (rows > 0) {
                return "{\"success\": true}";
            } else {
                return "{\"success\": false, \"message\": \"未插入任何数据\"}";
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "{\"success\": false, \"message\": \"驱动加载失败\"}";
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"success\": false, \"message\": \"用户名已存在或数据库错误\"}";
        }
    }

    // 通过用户名获取对应的浏览记录, 返回一个包含所有查询信息的ArrayList<History>

    public ArrayList<History> getHistory(String username)
    {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        ArrayList<History> historyList = new ArrayList<>();

        try {
            // 启动引擎
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 连接建立数据库对象
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            //创建执行sql语句的对象
            stmt = conn.createStatement();
            // 书写sql的String语句, 查看返回结果
            String sql = "select t1.div_id, t1.timestamp, t2.name, t2.image1_path " +
                    "from browsing_history t1, anime t2 " +
                    "where t1.div_id = t2.id and t1.username = '" + username + "' order by t1.timestamp desc";
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                int div_id = rs.getInt("div_id"); // 获取 div_id
                Timestamp timestamp = rs.getTimestamp("timestamp"); // 获取日期时间
                String name = rs.getString("name"); // 获取名称
                String url = rs.getString("image1_path");

                String date = "";
                if (timestamp != null) {
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    date = formatter.format(timestamp);
                }

                System.out.println(date);
                // 获取 URLs
                historyList.add(new History(div_id, date, name, url));
            }

            rs.close();
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return historyList;
    }


    // 直接调取所有的动漫资源, 放在ArrayList<SimpleAnime>中返回

    public ArrayList<SimpleAnime> getAllAnime()
    {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        ArrayList<SimpleAnime> AnimeList = new ArrayList<>();

        try {
            // 启动引擎
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 连接建立数据库对象
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            //创建执行sql语句的对象
            stmt = conn.createStatement();
            // 书写sql的String语句, 查看返回结果
            String sql = "select id, name, year, episodes, author, image1_path from anime";
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                SimpleAnime anime = new SimpleAnime();
                anime.setId(rs.getInt("id"));
                anime.setTitle(rs.getString("name"));
                anime.setReleaseYear(rs.getString("year"));
                anime.setEpisodes(rs.getString("episodes"));
                anime.setAuthor(rs.getString("author"));
                anime.setImageUrl(rs.getString("image1_path"));

                // 获取 URLs
                AnimeList.add(anime);
            }

            rs.close();
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return AnimeList;
    }


}