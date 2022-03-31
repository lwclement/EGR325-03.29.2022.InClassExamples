import java.sql.*;
import java.util.Scanner;

public class JdbcDemoSelectBad {

    public static void main(String[] args) throws SQLException {
        Connection ap = DriverManager.getConnection("jdbc:mysql://localhost:3306/ap", "root", "password");
        try {

            System.out.print("Enter vendor id: ");
            Scanner scnr = new Scanner(System.in);
            String userInput = scnr.nextLine();

            String sql = "select * from invoices where vendor_id = " + userInput + ";";
            System.out.println(sql);

            Statement s = ap.createStatement();
            ResultSet rs = s.executeQuery(sql);

            int invoice_id;
            int vendor_id;
            String invoice_number;

            while (rs.next()) {
                invoice_id = rs.getInt("invoice_id");
                vendor_id = rs.getInt("vendor_id");
                invoice_number = rs.getString("invoice_number");
                System.out.println(invoice_id + "\t\t" + vendor_id + "\t\t" + invoice_number);
            }
        }
        catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            ap.close();
        }
    }
}