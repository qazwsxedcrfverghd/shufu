// 机器学习资源数据
var resourcesData = {
  books: [
    // 机器学习/数据挖掘
    {
      title: "Distributed Machine Learning Patterns",
      category: "机器学习",
      link: "https://github.com/terrytangyuan/distributed-ml-patterns",
      description: "一本关于分布式机器学习模式的免费在线书籍，附带代码",
      type: "Online Book + Code"
    },
    {
      title: "The Hundred-Page Machine Learning Book",
      category: "机器学习",
      link: "http://themlbook.com/wiki/doku.php",
      description: "一本简洁的机器学习入门书籍，仅有100页",
      type: "Book"
    },
    {
      title: "Real World Machine Learning",
      category: "机器学习",
      link: "https://www.manning.com/books/real-world-machine-learning",
      description: "一本关于实际应用中的机器学习案例书籍，提供免费章节",
      type: "Book [Free Chapters]"
    },
    {
      title: "An Introduction To Statistical Learning With Applications In R",
      category: "机器学习",
      link: "https://drive.usercontent.google.com/download?id=106d-rN7cXpyAkgrUqjcPONNCyO-rX7MQ&export=download",
      description: "统计学习导论，包含R语言代码示例",
      type: "Book + R Code"
    },
    {
      title: "An Introduction To Statistical Learning With Applications In Python",
      category: "机器学习",
      link: "https://drive.usercontent.google.com/download?id=1ajFkHO6zjrdGNqhqW1jKBZdiNGh_8YQ1&export=download",
      description: "统计学习导论，包含Python代码示例",
      type: "Book + Python Code"
    },
    {
      title: "Elements of Statistical Learning",
      category: "机器学习",
      link: "https://web.stanford.edu/~hastie/ElemStatLearn/",
      description: "斯坦福大学的统计学习经典教材",
      type: "Book"
    },
    {
      title: "Computer Age Statistical Inference (CASI)",
      category: "机器学习",
      link: "https://web.stanford.edu/~hastie/CASI_files/PDF/casi.pdf",
      description: "计算机时代的统计推断",
      type: "Book"
    },
    {
      title: "Probabilistic Programming & Bayesian Methods for Hackers",
      category: "机器学习",
      link: "http://camdavidsonpilon.github.io/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/",
      description: "面向开发者的概率编程与贝叶斯方法教程，附带IPython notebooks",
      type: "Book + IPython Notebooks"
    },
    {
      title: "Think Bayes",
      category: "机器学习",
      link: "https://greenteapress.com/wp/think-bayes/",
      description: "贝叶斯思维：运用Python进行贝叶斯统计分析",
      type: "Book + Python Code"
    },
    {
      title: "Information Theory, Inference, and Learning Algorithms",
      category: "机器学习",
      link: "http://www.inference.phy.cam.ac.uk/mackay/itila/book.html",
      description: "信息论、推断与学习算法",
      type: "Book"
    },
    {
      title: "Reinforcement Learning: An Introduction",
      category: "强化学习",
      link: "http://incompleteideas.net/book/the-book-2nd.html",
      description: "强化学习的经典入门教材",
      type: "Book"
    },
    {
      title: "Mining Massive Datasets",
      category: "数据挖掘",
      link: "http://infolab.stanford.edu/~ullman/mmds/book.pdf",
      description: "斯坦福大学关于大规模数据集挖掘的课程教材",
      type: "Book"
    },
    {
      title: "Pattern Recognition and Machine Learning",
      category: "机器学习",
      link: "http://users.isr.ist.utl.pt/~wurmd/Livros/school/Bishop%20-%20Pattern%20Recognition%20And%20Machine%20Learning%20-%20Springer%20%202006.pdf",
      description: "Bishop编写的模式识别与机器学习经典教材",
      type: "Book"
    },
    {
      title: "A Course in Machine Learning",
      category: "机器学习",
      link: "http://ciml.info/",
      description: "机器学习课程，覆盖经典算法和技术",
      type: "Book"
    },
    {
      title: "Hands‑On Machine Learning with Scikit‑Learn and TensorFlow",
      category: "机器学习",
      link: "http://index-of.es/Varios-2/Hands%20on%20Machine%20Learning%20with%20Scikit%20Learn%20and%20Tensorflow.pdf",
      description: "使用Scikit-Learn和TensorFlow进行机器学习实践",
      type: "Book"
    },
    {
      title: "R for Data Science",
      category: "数据科学",
      link: "https://r4ds.had.co.nz/",
      description: "R语言数据科学指南：导入、整理、转换、可视化和建模数据",
      type: "Book"
    },
    {
      title: "Mathematics for Machine Learning",
      category: "机器学习",
      link: "https://mml-book.github.io/",
      description: "机器学习数学基础，包括线性代数、微积分和概率论",
      type: "Book"
    },
    {
      title: "Human-in-the-Loop Machine Learning",
      category: "机器学习",
      link: "https://www.manning.com/books/human-in-the-loop-machine-learning",
      description: "人在环机器学习：以人为中心的AI的主动学习和标注",
      type: "Book"
    },
    // 深度学习类
    {
      title: "Deep Learning",
      category: "深度学习",
      link: "https://www.deeplearningbook.org/",
      description: "Ian Goodfellow, Yoshua Bengio和Aaron Courville编写的深度学习经典教材",
      type: "Book"
    },
    {
      title: "Deep Learning with Python",
      category: "深度学习",
      link: "https://www.manning.com/books/deep-learning-with-python",
      description: "使用Python进行深度学习，Keras创建者François Chollet编写",
      type: "Book"
    },
    {
      title: "Deep Learning with Python, Second Edition",
      category: "深度学习",
      link: "https://www.manning.com/books/deep-learning-with-python-second-edition",
      description: "使用Python进行深度学习的第二版，更新了最新技术和工具",
      type: "Early access book"
    },
    {
      title: "Deep Learning with JavaScript",
      category: "深度学习",
      link: "https://www.manning.com/books/deep-learning-with-javascript",
      description: "使用JavaScript进行深度学习，基于TensorFlow.js",
      type: "Early access book"
    },
    {
      title: "Grokking Deep Learning",
      category: "深度学习",
      link: "https://www.manning.com/books/grokking-deep-learning",
      description: "从零开始理解深度学习原理",
      type: "Early access book"
    },
    {
      title: "Math and Architectures of Deep Learning",
      category: "深度学习",
      link: "https://www.manning.com/books/math-and-architectures-of-deep-learning",
      description: "深度学习的数学原理和架构设计",
      type: "Early access book"
    },
    // 自然语言处理
    {
      title: "NLTK",
      category: "自然语言处理",
      link: "https://www.nltk.org/book/",
      description: "使用Python进行自然语言处理的NLTK教程",
      type: "Book"
    },
    {
      title: "Foundations of Statistical Natural Language Processing",
      category: "自然语言处理",
      link: "https://nlp.stanford.edu/fsnlp/promo/",
      description: "统计自然语言处理基础，斯坦福大学经典教材",
      type: "Book"
    },
    {
      title: "Natural Language Processing in Action",
      category: "自然语言处理",
      link: "https://www.manning.com/books/natural-language-processing-in-action",
      description: "自然语言处理实战，展示如何构建实际NLP应用",
      type: "Early access book"
    },
    {
      title: "Real-World Natural Language Processing",
      category: "自然语言处理",
      link: "https://www.manning.com/books/real-world-natural-language-processing",
      description: "实际应用中的自然语言处理案例与技术",
      type: "Early access book"
    },
    {
      title: "Transfer Learning for Natural Language Processing",
      category: "自然语言处理",
      link: "https://www.manning.com/books/transfer-learning-for-natural-language-processing",
      description: "自然语言处理中的迁移学习技术",
      type: "Book"
    },
    // 神经网络
    {
      title: "Neural Networks and Deep Learning",
      category: "神经网络",
      link: "http://neuralnetworksanddeeplearning.com/",
      description: "神经网络与深度学习基础教程",
      type: "Book"
    },
    {
      title: "Graph Neural Networks in Action",
      category: "神经网络",
      link: "https://www.manning.com/books/graph-neural-networks-in-action",
      description: "图神经网络实战指南",
      type: "Book"
    },
    // 概率与统计
    {
      title: "Think Stats",
      category: "概率与统计",
      link: "https://www.greenteapress.com/thinkstats/",
      description: "使用Python进行统计思维",
      type: "Book + Python Code"
    },
    {
      title: "Introduction to Probability",
      category: "概率与统计",
      link: "https://math.dartmouth.edu/~prob/prob/prob.pdf",
      description: "达特茅斯学院概率导论",
      type: "Book"
    },
    {
      title: "Probability & Statistics Cookbook",
      category: "概率与统计",
      link: "http://statistics.zone/",
      description: "概率与统计速查手册",
      type: "Reference"
    },
    // 线性代数
    {
      title: "Linear Algebra Done Wrong",
      category: "线性代数",
      link: "https://www.math.brown.edu/~treil/papers/LADW/LADW.html",
      description: "线性代数另类视角",
      type: "Book"
    },
    {
      title: "The Matrix Cookbook",
      category: "线性代数",
      link: "https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf",
      description: "矩阵计算参考手册",
      type: "Reference"
    },
    // 微积分
    {
      title: "Calculus Made Easy",
      category: "微积分",
      link: "https://github.com/lahorekid/Calculus/blob/master/Calculus%20Made%20Easy.pdf",
      description: "简明微积分入门",
      type: "Book"
    },
    {
      title: "Active Calculus",
      category: "微积分",
      link: "https://scholarworks.gvsu.edu/books/20/",
      description: "互动式微积分学习",
      type: "Book"
    }
  ]
}; 
