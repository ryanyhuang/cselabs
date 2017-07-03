import java.util.Date;
import java.lang.*;

public class randLabGen{
	public static void main(String[] args){

		String toWrite = "";

		for(int i = 0; i < 6; i++){
			for(int j = 0; j < 42; j++){
				int onOff = (int) Math.floor(Math.random()*3);
				toWrite += onOff;
			}
			toWrite += "\n";
		}

		Date date = new Date();
		System.out.println(date.toString());
		System.out.print(toWrite);

	}
}