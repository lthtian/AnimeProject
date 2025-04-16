package servlet;

/**
 * ClassName: GetHistoryServlet
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/29 14:41
 */

import dao.AnimeDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import model.History;

@WebServlet("/GetHistory")
public class GetHistoryServlet extends HttpServlet {
    private final AnimeDAO animeDAO = new AnimeDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        System.out.println("触发GetHistory");

        // 获取前端传递的 username 参数
        String username = request.getParameter("username");

        System.out.println(username);

        ArrayList<History> historyList = animeDAO.getHistory(username);

        // 转换为 JSON 返回
        String json = new Gson().toJson(historyList);

        System.out.println("生成的 JSON: " + json);

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        out.print(json);
        out.flush();
    }
}

