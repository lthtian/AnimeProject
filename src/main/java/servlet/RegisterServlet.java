package servlet;

/**
 * ClassName: RegisterServlet
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/24 15:39
 */

import dao.AnimeDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private final AnimeDAO animeDAO = new AnimeDAO();
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 获取json数据
        String requestData = request.getReader().lines().reduce("", (acc, line) -> acc + line);
        // 解析 JSON 数据
        JsonObject json = JsonParser.parseString(requestData).getAsJsonObject();
        String username = json.get("username").getAsString();
        String password = json.get("password").getAsString();

        String jsonString = animeDAO.setUser(username, password);

        // 设置响应类型为 JSON
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        out.write(jsonString);
    }
}