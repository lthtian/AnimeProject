package servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Anime;

import java.sql.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import com.fasterxml.jackson.databind.ObjectMapper;



@WebServlet("/hello")
public class HelloWorldServlet extends HttpServlet {
    private final String URL = "jdbc:mysql://82.156.254.74:3306/Anime?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC";
    private final String USER = "lth";
    private final String PASSWORD = "040915ly";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 连接建立数据库对象
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            //创建执行sql语句的对象
            stmt = conn.createStatement();
            // 书写sql的String语句, 查看返回结果集
            String sql = "SELECT * FROM anime where id = 1 or id = 2";
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

                response.getWriter().println(jsonString);
            }

            rs.close();
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        response.getWriter().println("Hello, World!");
    }
}