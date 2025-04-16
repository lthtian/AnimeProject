package servlet;

/**
 * ClassName: AllAnimeServlet
 * Description:
 *
 * @author lth
 * @version 1.0
 * @since 2024/12/30 12:50
 */

import com.google.gson.Gson;
import dao.AnimeDAO;
import model.Anime;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.History;
import model.SimpleAnime;

@WebServlet("/allanime")
public class AllAnimeServlet extends HttpServlet {
    private final AnimeDAO animeDAO = new AnimeDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        System.out.println("触发AllAnimeServlet");

        ArrayList<SimpleAnime> animeList = animeDAO.getAllAnime();

        // 转换为 JSON 返回
        String json = new Gson().toJson(animeList);

        System.out.println("生成的 JSON: " + json);

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        out.print(json);
        out.flush();
    }
}