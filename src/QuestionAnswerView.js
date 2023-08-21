// QuestionAnswering.js

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "./component/Button";
import RadioButton from "./component/RadioButton";

function QuestionAnswerView() {
  const [language, setLanguage] = useState([
    { language: "English", select: false },
    { language: "German", select: true },
  ]);
const [isLoading,setIsLoading]=useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(
    language
      .filter((item, index) => item.select && item.language)
      .map((item) => item.language)
  );
  useEffect(() => {
    setSelectedLanguage(
      language
        .filter((item, index) => item.select && item.language)
        .map((item) => item.language)
    );
  }, [language]);
  const inputRef = useRef(null);
  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []);
  const [selectedButton, setSelectedButton] = useState();
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    if (selectedButton) {
      setContext(
        selectedLanguage[0] == "English"
          ? selectedButton == "Food"
            ? "Xylitol is also known as birch sugar. Xylitol tastes just as sweet as sugar, and you can replace it one-to-one in recipes. But why should you do that? Birch sugar has some positive advantages over table sugar. On the one hand, it is tooth-friendly and even has a non-cariogenic effect, i.e. it does not cause caries. Secondly, xylitol is particularly popular because of its low glycemic index. It has a glycemic index of 7 to 11, while that of regular sugar is 65 to 100. So if you want to consciously avoid the negative properties of sugar, but not its sweetness, you should give xylitol a try. However, in moderation, because in high doses it can have a laxative effect. Birch sugar should also be kept away from dogs, as it can even be fatal for the four-legged friends."
            : selectedButton == "Electronics"
            ? "The iPhone SE (2020) scores very well in the test and allows Apple fans to dive into the iPhone world for less money. The performance is excellent and the battery lasts for a really long time. The camera also does a decent job, but has to admit defeat to the top models. iPhone SE packs Apple's powerful A13 Bionic chip into Apple's most popular size at a most affordable price. It’s just what you’ve been waiting for. It has a height of 138.4 mm, a width of 67.3 mm and a depth of 7.3 mm. It starts at $399."
            : "The Apache Lucene project develops open-source search software. The project releases a core search library, named Lucene core, as well as the Solr search server. Solr is a high performance search server built using Lucene Core. Solr is highly scalable, providing fully fault tolerant distributed indexing, search and analytics. It exposes Lucene's features through easy to use JSON/HTTP interfaces or native clients for Java and other languages."
          : selectedButton == "Food"
          ? "Xylitol ist auch als Birkenzucker bekannt. Xylit schmeckt genauso süß wie Zucker, und Sie können es in Rezepten eins zu eins ersetzen. Aber warum sollten Sie das tun? Birkenzucker hat einige positive Vorteile gegenüber Haushaltszucker. Zum einen ist er zahnfreundlich und wirkt sogar nicht kariogen, d.h. er verursacht keine Karies. Zum anderen ist Xylit besonders beliebt wegen seines niedrigen glykämischen Index. Er hat einen glykämischen Index von 7 bis 11, während der von normalem Zucker bei 65 bis 100 liegt. Wer also bewusst auf die negativen Eigenschaften des Zuckers, nicht aber auf seine Süße verzichten möchte, sollte Xylit ausprobieren. Allerdings in Maßen, denn in hohen Dosen kann es abführend wirken. Auch von Hunden sollte Birkenzucker ferngehalten werden, da er für die Vierbeiner sogar tödlich sein kann."
          : selectedButton == "Electronics"
          ? "Das iPhone SE (2020) schneidet im Test sehr gut ab und ermöglicht Apple-Fans den Einstieg in die iPhone-Welt für weniger Geld. Die Leistung ist hervorragend und der Akku hält wirklich lange durch. Auch die Kamera macht einen ordentlichen Job, muss sich aber den Top-Modellen geschlagen geben. Das iPhone SE packt Apples leistungsstarken A13-Bionic-Chip in die beliebteste Apple-Größe zu einem äußerst günstigen Preis. Es ist genau das, worauf Sie gewartet haben. Es hat eine Höhe von 138,4 mm, eine Breite von 67,3 mm und eine Tiefe von 7,3 mm. Es beginnt bei 399 $."
          : "Das Apache Lucene-Projekt entwickelt Open-Source-Such-Software. Das Projekt veröffentlicht eine Kern-Suchbibliothek, genannt Lucene Core, sowie den Solr-Suchserver. Solr ist ein hochleistungsfähiger Suchserver, der auf Lucene Core aufbaut. Solr ist hoch skalierbar und bietet vollständig fehlertolerante verteilte Indizierung, Suche und Analyse. Er stellt die Funktionen von Lucene über einfach zu verwendende JSON/HTTP-Schnittstellen oder native Clients für Java und andere Sprachen zur Verfügung."
      );

      setQuestion(
        selectedLanguage[0] == "English"
          ? selectedButton == "Food"
            ? "What is the advantage of birch sugar?"
            : selectedButton == "Electronics"
            ? "What chip is in the iPhone SE?"
            : "How can I connect to the search server?"
          : selectedButton == "Food"
          ? "Was ist der Vorteil von Birkenzucker?"
          : selectedButton == "Electronics"
          ? "Welcher Prozessor ist im iPhone SE?"
          : "Wie kann ich den Suchserver ansprechen?"
      );
    }
  }, [selectedButton, selectedLanguage]);
  const handleGetAnswer = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        "http://127.0.0.1:5000/api/question-answering",
        { question, context }
      );
      setAnswer(response.data.answer);
       setIsLoading(false)
    } catch (error) {
       setIsLoading(false)
      console.error("Error fetching answer:", error);
    }
  };
  const QuestionbuttonView = () => {
    return (
      <div className="bg-[#eef7f7] p-5 flex-col m-4 rounded-lg">
        <p className="ml-3">
          Enter your own text or use one of these examples:
        </p>
        <div className=" sm:flex sm:flex-row sm:justify-start sm:space-x-5 ">
          <Button
            title={"Food"}
            width={"w-full"}
            bgColor={"bg-[#35b3b5]"}
            hoverBgColor={"hover:bg-[#258688]"}
            onClick={() => setSelectedButton("Food")}
          />
          <Button
            title={"Electronics"}
            width={"w-full"}
            bgColor={"bg-[#35b3b5]"}
            hoverBgColor={"hover:bg-[#258688]"}
            onClick={() => setSelectedButton("Electronics")}
          />
          <Button
            title={"Techn.Manual"}
            width={"w-full"}
            bgColor={"bg-[#35b3b5]"}
            hoverBgColor={"hover:bg-[#258688]"}
            onClick={() => setSelectedButton("Techn.Manual")}
          />
          <div className="flex justify-center ">
            <Button
              title={"clear"}
              width={"w-full"}
              textColor={"black"}
              bgColor={"bg-[#c6dcdc]"}
              hoverBgColor="hover:bg-[#aabcbd]"
              onClick={() => {
                setSelectedButton();
                setAnswer("");
                setQuestion("")
                setContext("");
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const RadioButtonView = () => {
    return (
      <div className="flex justify-center space-x-[105px] my-9">
        {language.map((item, index) => (
          <RadioButton
            LabelTitle={item.language}
            select={item.select}
            onSelect={() => {
              var newLanguage = [...language];
              newLanguage.map((item) => (item.select = false));
              newLanguage[index].select = true;
              setLanguage(newLanguage);
            }}
          />
        ))}
      </div>
    );
  };
  const TextAreaFeild = () => {
    return (
      <div className="w-[100%] flex flex-col items-center px-20 relative">
        <textarea
          id="message"
          name="message"
          rows="4"
          cols="50"
          value={context}
          placeholder="Enter a Context"
          onChange={(e)=>setContext( e.target.value)}
          className={`h-[390px] border-4 w-[100%] ${context?"border-[#35b3b5]":"border-[#e5e7eb]"}  focus:outline-none`}
        />

        {/* <div className="-mt-4 w-20 h-5 border-4 border-[#35b3b5] rounded-lg bg-[#35b3b5]" /> */}

        <input
          type="text"
          id="input"
          name="input"
          placeholder={`Enter a question`}
          className= {`h-[90px] w-[100%] focus:outline-none bg-[#f5f5f5] ${question?"border-[#35b3b5]":"border-[#e5e7eb]"}  border-4`}
          ref={inputRef}
          value={question}
          onChange={(e)=>setQuestion( e.target.value)}
        />

        {answer ? (
          <div className="flex w-[100%] bg-[#35b3b5]  p-10">
            <div className="flex bg-yellow-300">
              <h3 className="font-bold text-xl text-[#ffffff]">{answer}</h3>
            </div>
          </div>
        ) : null}

        <div
          onClick={() => {
            if (selectedButton) {
              handleGetAnswer();
            }
          }}
          className="hover:bg-[#258688] cursor-pointer bg-[#35b3b5] w-[100%] rounded-lg p-5 mt-10 flex justify-center items-center"
        >
          <h3 className="text-[20px] text-[#ffffff]">{`Get the answer (${selectedLanguage[0]})`}</h3>
        </div>
      </div>
    );
  };
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
      
      {/* Loading spinner */}
      <div className="border-4 border-t-4 border-blue-500 rounded-full animate-spin h-12 w-12"></div>
    </div>

  );
}
  return (
    <div>
    {isLoading?
    <Loader/>
    :
    <div className="">
      {QuestionbuttonView()}

      {/* radio button view */}
      {RadioButtonView()}
      {TextAreaFeild()}
    </div>}
    </div>
  );
}

export default QuestionAnswerView;
