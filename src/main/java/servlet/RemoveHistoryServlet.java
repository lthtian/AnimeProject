package servlet;

/**
 * ClassName: RemoveHistoryServlet
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/29 21:06
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


@WebServlet("/removeBrowsingHistory")
public class RemoveHistoryServlet extends HttpServlet {
    private final AnimeDAO animeDAO = new AnimeDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 获取json数据
        String requestData = request.getReader().lines().reduce("", (acc, line) -> acc + line);
        // 解析 JSON 数据
        JsonObject json = JsonParser.parseString(requestData).getAsJsonObject();

        String username = json.get("username").getAsString();
        String divIdParam = json.get("divId").getAsString();

        int divId;
        try {
            divId = Integer.parseInt(divIdParam);
        } catch (NumberFormatException e) {
            response.getWriter().write("{\"success\": false, \"message\": \"div_id 无效\"}");
            return;
        }

        // 将浏览记录存储到数据库
        animeDAO.removeHistory(username, divId);

        response.getWriter().write("{\"success\": true}");
    }
}