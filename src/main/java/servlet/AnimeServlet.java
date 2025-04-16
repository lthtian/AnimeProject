package servlet;

/**
 * ClassName: AnimeServlet
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/14 17:04
 */

import dao.AnimeDAO;
import model.Anime;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;

 // 用于前后端交互的javaweb部分

@WebServlet("/anime")
public class AnimeServlet extends HttpServlet {
    // 创建一个animeDAO
    private final AnimeDAO animeDAO = new AnimeDAO();

    @Override

    protected void doGet(HttpServletRequest request, HttpServletResponse response)  {
        String idParam = request.getParameter("id");

        try {
            // 将 id 转换为整数
            int id = Integer.parseInt(idParam);

            // 从数据库获取番剧信息
            String jsonString = animeDAO.getAnimeById(id);

            // 设置响应类型为 JSON
            response.setContentType("application/json;charset=UTF-8");
            response.setCharacterEncoding("UTF-8");

            PrintWriter out = response.getWriter();
            out.write(jsonString);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}