// ─────────────────────────────────────────────
// Static Data for China Physics PhD Finder Agent
// Replaces Prisma/SQLite for Vercel serverless deployment
// ─────────────────────────────────────────────

export interface University {
  id: string
  name: string
  city: string
  province: string
  type: 'University' | 'CAS Institute'
  department: string
  researchGroup: string | null
  url: string
  fields: string
  deadline: string
  englishProgram: boolean
  hskRequired: boolean
  hskLevel: string | null
  cscDesignated: boolean
  scholarshipTypes: string
  requiredDocuments: string
  notableProfessors: string
  notesForNepali: string
}

export interface CSCInfo {
  id: string
  title: string
  category: string
  content: string
}

// ─────────────────────────────────────────────
// UNIVERSITIES (34)
// ─────────────────────────────────────────────
export const universities: University[] = [
  {
    id: 'uni-1',
    name: 'Peking University (PKU)',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.pku.edu.cn',
    fields: 'Condensed Matter,Particle Physics,Astrophysics,Optics,Atomic & Molecular Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,PKU Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Xie Xincheng (Condensed Matter)|Prof. Gao Yiqing (Theoretical Physics)|Prof. Ren Yufeng (Astrophysics)|Prof. Gong Qihuang (Optics)',
    notesForNepali:
      'Top-ranked in China. Very competitive; strong publication record needed. CSC Type A or B both accepted. Contact professors early (Nov-Dec). Beijing has a large Nepali student community.',
  },
  {
    id: 'uni-2',
    name: 'Tsinghua University',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://www.phys.tsinghua.edu.cn',
    fields: 'Condensed Matter,Particle Physics,Nuclear Physics,Quantum Information',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,Tsinghua Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Xue Qikun (Condensed Matter)|Prof. Yao Dazhi (Particle Physics)|Prof. Chen Wen (Nuclear Physics)|Prof. Duan Luming (Quantum Information)',
    notesForNepali:
      'Ranked #1 or #2 in China. Extremely competitive but excellent research facilities. Quantum Information group is world-class. Apply via CSC Type B for best chances.',
  },
  {
    id: 'uni-3',
    name: 'University of Science and Technology of China (USTC)',
    city: 'Hefei',
    province: 'Anhui',
    type: 'University',
    department: 'School of Physical Sciences',
    researchGroup: null,
    url: 'https://ps.ustc.edu.cn',
    fields: 'Quantum Information,Condensed Matter,Nuclear Physics,Plasma Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,USTC Scholarship,Anhui Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Pan Jianwei (Quantum Information)|Prof. Lu Zhaoyang (Condensed Matter)|Prof. Wang Naiyan (Nuclear Physics)|Prof. Wan Baonian (Plasma Physics)',
    notesForNepali:
      'World leader in Quantum Information (Pan Jianwei group). Hefei is affordable city. Strong CAS collaboration. English-medium PhD available. Lower cost of living than Beijing/Shanghai.',
  },
  {
    id: 'uni-4',
    name: 'Fudan University',
    city: 'Shanghai',
    province: 'Shanghai',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.fudan.edu.cn',
    fields: 'Condensed Matter,Optics,Theoretical Physics,Nuclear Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,Fudan Scholarship,Shanghai Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhang Yuanbo (Condensed Matter)|Prof. Jin Guojun (Theoretical Physics)|Prof. Wu Yiping (Nuclear Physics)|Prof. Zhou Lei (Optics)',
    notesForNepali:
      'Top-tier Shanghai university. Good condensed matter and optics groups. Shanghai Government Scholarship is generous. Living costs higher in Shanghai but stipend covers basics.',
  },
  {
    id: 'uni-5',
    name: 'Shanghai Jiao Tong University (SJTU)',
    city: 'Shanghai',
    province: 'Shanghai',
    type: 'University',
    department: 'School of Physics and Astronomy',
    researchGroup: null,
    url: 'https://physics.sjtu.edu.cn',
    fields: 'Condensed Matter,Astrophysics,Particle Physics,Plasma Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,SJTU Scholarship,Shanghai Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Jia Weiping (Astrophysics)|Prof. Fang Zhong (Condensed Matter)|Prof. Liu Jianglai (Particle Physics)|Prof. Wang Gang (Plasma Physics)',
    notesForNepali:
      'Excellent astrophysics and particle physics groups. T.D. Lee Physics Laboratory on campus. Shanghai location good for international conferences. Apply early for accommodation.',
  },
  {
    id: 'uni-6',
    name: 'Zhejiang University',
    city: 'Hangzhou',
    province: 'Zhejiang',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.zju.edu.cn',
    fields: 'Condensed Matter,Optics,Quantum Information,Astrophysics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,ZJU Scholarship,Zhejiang Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Luyang (Condensed Matter)|Prof. Chen Sheng (Quantum Information)|Prof. Xie Xiaodong (Optics)|Prof. Fu Kuangwu (Astrophysics)',
    notesForNepali:
      'Hangzhou is a beautiful city with moderate cost of living. Strong quantum information group. Zhejiang Provincial Scholarship available. Good campus facilities for international students.',
  },
  {
    id: 'uni-7',
    name: 'Nanjing University',
    city: 'Nanjing',
    province: 'Jiangsu',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.nju.edu.cn',
    fields: 'Condensed Matter,Acoustics,Particle Physics,Astrophysics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,NJU Scholarship,Jiangsu Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Enge (Condensed Matter)|Prof. Min Naiben (Acoustics)|Prof. Song Zhangping (Particle Physics)|Prof. Ding Mingde (Astrophysics)',
    notesForNepali:
      'Renowned for condensed matter physics and acoustics. NJU has state key laboratories. Nanjing is affordable and historically rich. Jiangsu Provincial Scholarship is generous for Nepali students.',
  },
  {
    id: 'uni-8',
    name: 'Sun Yat-sen University',
    city: 'Guangzhou',
    province: 'Guangdong',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://spa.sysu.edu.cn',
    fields: 'Optics,Condensed Matter,Particle Physics,Astrophysics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,SYSU Scholarship,Guangdong Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Luo Jun (Optics)|Prof. Wang Xuehua (Condensed Matter)|Prof. He Chengjian (Particle Physics)|Prof. Lin Weiping (Astrophysics)',
    notesForNepali:
      "Guangzhou has a warm climate similar to Nepal's Terai. Large Nepali community in Guangdong. Good optics research. Guangdong Provincial Scholarship available. Affordable living costs.",
  },
  {
    id: 'uni-9',
    name: 'Wuhan University',
    city: 'Wuhan',
    province: 'Hubei',
    type: 'University',
    department: 'School of Physics and Technology',
    researchGroup: null,
    url: 'https://physics.whu.edu.cn',
    fields: 'Condensed Matter,Particle Physics,Acoustics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,WHU Scholarship,Hubei Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Liu Jisheng (Condensed Matter)|Prof. He Hailiang (Particle Physics)|Prof. Cheng Jianchun (Acoustics)',
    notesForNepali:
      'Very affordable cost of living in Wuhan. Good condensed matter and acoustics programs. WHU has beautiful campus. Nepali students report positive experiences here.',
  },
  {
    id: 'uni-10',
    name: 'Harbin Institute of Technology (HIT)',
    city: 'Harbin',
    province: 'Heilongjiang',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.hit.edu.cn',
    fields: 'Optics,Condensed Matter,Plasma Physics,Nuclear Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,HIT Scholarship,Heilongjiang Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Qi (Optics)|Prof. Tian Hao (Condensed Matter)|Prof. Wang Fudi (Plasma Physics)|Prof. Zhang Jianhua (Nuclear Physics)',
    notesForNepali:
      'WARNING: Harbin is extremely cold in winter (-30\u00B0C). Not for everyone, but excellent plasma physics program. Very affordable. HIT is top engineering university with strong physics. Prepare warm clothes!',
  },
  {
    id: 'uni-11',
    name: 'Beijing Institute of Technology (BIT)',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.bit.edu.cn',
    fields: 'Condensed Matter,Optics,Theoretical Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,BIT Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Yao Hong (Condensed Matter)|Prof. Zhang Xianhui (Optics)|Prof. Li Wei (Theoretical Physics)',
    notesForNepali:
      'Good Beijing university with less competition than PKU/Tsinghua. Solid condensed matter research. CSC designated. Beijing Government Scholarship available.',
  },
  {
    id: 'uni-12',
    name: 'Beijing Normal University',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.bnu.edu.cn',
    fields: 'Theoretical Physics,Condensed Matter,Nuclear Physics,Astronomy',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,BNU Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Yang Chao (Theoretical Physics)|Prof. Ma Qiang (Condensed Matter)|Prof. Zhou Shan (Nuclear Physics)|Prof. Zhu Zonghong (Astronomy)',
    notesForNepali:
      'Strong theoretical physics and astronomy programs. Less competitive than PKU/Tsinghua but good research. Located in Beijing with excellent academic resources. Good for theoretical physics focus.',
  },
  {
    id: 'uni-13',
    name: 'Jilin University',
    city: 'Changchun',
    province: 'Jilin',
    type: 'University',
    department: 'College of Physics',
    researchGroup: null,
    url: 'https://physics.jlu.edu.cn',
    fields: 'Condensed Matter,Theoretical Physics,Nuclear Physics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,JLU Scholarship,Jilin Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Gao Yihong (Condensed Matter)|Prof. Wang Zhiwei (Theoretical Physics)|Prof. Liu Baojian (Nuclear Physics)|Prof. Zhang Guoquan (Optics)',
    notesForNepali:
      'Cold winters in Changchun but affordable city. Strong condensed matter and nuclear physics. JLU is one of the largest universities in China. Good for Nepali students on budget.',
  },
  {
    id: 'uni-14',
    name: 'Shandong University',
    city: 'Jinan',
    province: 'Shandong',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://www.phy.sdu.edu.cn',
    fields: 'Particle Physics,Condensed Matter,Astrophysics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,SDU Scholarship,Shandong Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Huang Xingtao (Particle Physics)|Prof. Chen Jian (Condensed Matter)|Prof. Xia Liming (Astrophysics)',
    notesForNepali:
      'Strong particle physics group (involved in Daya Bay experiment). Jinan has moderate climate. Shandong Provincial Scholarship available. Good campus and research facilities.',
  },
  {
    id: 'uni-15',
    name: 'Sichuan University',
    city: 'Chengdu',
    province: 'Sichuan',
    type: 'University',
    department: 'College of Physics',
    researchGroup: null,
    url: 'https://physics.scu.edu.cn',
    fields: 'Condensed Matter,Nuclear Physics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,SCU Scholarship,Sichuan Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhang Jianhua (Condensed Matter)|Prof. Liu Shubin (Nuclear Physics)|Prof. Li Zhaoyang (Optics)',
    notesForNepali:
      'Chengdu is affordable, food is amazing, and climate is mild. Growing Nepali community. Good nuclear physics research. Sichuan Provincial Scholarship competitive but available.',
  },
  {
    id: 'uni-16',
    name: "Xi'an Jiao Tong University",
    city: "Xi'an",
    province: 'Shaanxi',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://phy.xjtu.edu.cn',
    fields: 'Condensed Matter,Plasma Physics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,XJTU Scholarship,Shaanxi Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhang Lei (Condensed Matter)|Prof. Wu Yuming (Plasma Physics)|Prof. Wang Yufei (Optics)',
    notesForNepali:
      "Xi'an is historically rich city with affordable living. Good plasma physics research. XJTU has excellent facilities. Shaanxi Provincial Scholarship available. Warm summers, cold winters.",
  },
  {
    id: 'uni-17',
    name: 'Huazhong University of Science and Technology (HUST)',
    city: 'Wuhan',
    province: 'Hubei',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.hust.edu.cn',
    fields: 'Condensed Matter,Optics,Gravitational Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,HUST Scholarship,Hubei Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wu Ying (Optics)|Prof. Liao Changjun (Gravitational Physics)|Prof. Liu Xiangyang (Condensed Matter)',
    notesForNepali:
      'One of the unique gravitational physics groups in China (detectors). Wuhan is affordable. HUST has strong engineering and physics combined programs. Good for interdisciplinary research.',
  },
  {
    id: 'uni-18',
    name: 'Southeast University',
    city: 'Nanjing',
    province: 'Jiangsu',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.seu.edu.cn',
    fields: 'Condensed Matter,Quantum Information',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,SEU Scholarship,Jiangsu Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Jiping (Condensed Matter)|Prof. Chen Zeng (Quantum Information)',
    notesForNepali:
      'Smaller physics department but growing quantum information group. Nanjing is a great city. Jiangsu Provincial Scholarship available. Less competitive than NJU for admission.',
  },
  {
    id: 'uni-19',
    name: 'Tongji University',
    city: 'Shanghai',
    province: 'Shanghai',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.tongji.edu.cn',
    fields: 'Condensed Matter,Acoustics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,Tongji Scholarship,Shanghai Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Shen Junhao (Condensed Matter)|Prof. Cheng Jianchun (Acoustics)|Prof. Zhang Weiping (Optics)',
    notesForNepali:
      'Good acoustics research group. Shanghai location provides many opportunities. Tongji has strong international cooperation. Shanghai Government Scholarship available.',
  },
  {
    id: 'uni-20',
    name: 'South China University of Technology',
    city: 'Guangzhou',
    province: 'Guangdong',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.scut.edu.cn',
    fields: 'Condensed Matter,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,SCUT Scholarship,Guangdong Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhao Weiren (Condensed Matter)|Prof. Li Zhigang (Optics)',
    notesForNepali:
      'Guangzhou location great for Nepali students (warm climate, large community). Good condensed matter research. Guangdong Provincial Scholarship available. Affordable compared to Shanghai/Beijing.',
  },
  {
    id: 'uni-21',
    name: 'Dalian University of Technology',
    city: 'Dalian',
    province: 'Liaoning',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.dlut.edu.cn',
    fields: 'Optics,Condensed Matter,Plasma Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,DUT Scholarship,Liaoning Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Liu Tieyu (Optics)|Prof. Wang Shuang (Condensed Matter)|Prof. Guo Wenping (Plasma Physics)',
    notesForNepali:
      'Dalian is a coastal city with pleasant climate (not as cold as Harbin). Good optics and plasma physics. Affordable living. Liaoning Provincial Scholarship available.',
  },
  {
    id: 'uni-22',
    name: 'Central South University',
    city: 'Changsha',
    province: 'Hunan',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.csu.edu.cn',
    fields: 'Condensed Matter,Particle Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,CSU Scholarship,Hunan Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Li Jiangyu (Condensed Matter)|Prof. Guo Xinghua (Particle Physics)',
    notesForNepali:
      'Changsha is affordable with great food. Growing physics department. Hunan Provincial Scholarship available. Less competitive for admission. Good for condensed matter focus.',
  },
  {
    id: 'uni-23',
    name: 'East China Normal University',
    city: 'Shanghai',
    province: 'Shanghai',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.ecnu.edu.cn',
    fields: 'Condensed Matter,Optics,Theoretical Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,ECNU Scholarship,Shanghai Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Hu Zhiqiang (Condensed Matter)|Prof. Zeng Heping (Optics)|Prof. Tong Pen (Theoretical Physics)',
    notesForNepali:
      'Good Shanghai university with less competition than Fudan/SJTU. Solid theoretical physics group. Shanghai Government Scholarship available. Good campus in downtown Shanghai.',
  },
  {
    id: 'uni-24',
    name: 'Lanzhou University',
    city: 'Lanzhou',
    province: 'Gansu',
    type: 'University',
    department: 'School of Nuclear Science and Technology',
    researchGroup: null,
    url: 'https://nuclear.lzu.edu.cn',
    fields: 'Nuclear Physics,Condensed Matter,Particle Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,LZU Scholarship,Gansu Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Chen Xianghui (Nuclear Physics)|Prof. Hou Qing (Condensed Matter)|Prof. Liu Zhifeng (Particle Physics)',
    notesForNepali:
      'One of the best nuclear physics programs in China. Lanzhou has heavy ion accelerator facility. Very affordable city. Gansu Provincial Scholarship available. Dry climate, may suit Nepali from hilly regions.',
  },
  {
    id: 'uni-25',
    name: 'Xiamen University',
    city: 'Xiamen',
    province: 'Fujian',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.xmu.edu.cn',
    fields: 'Condensed Matter,Astrophysics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,XMU Scholarship,Fujian Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Cai Zhiping (Condensed Matter)|Prof. Wu Qingyu (Astrophysics)|Prof. Chen Zhangyong (Optics)',
    notesForNepali:
      'Beautiful coastal campus (one of the most scenic in China). Warm climate year-round. Good astrophysics and condensed matter. Fujian Provincial Scholarship. Xiamen has moderate living costs.',
  },
  {
    id: 'uni-26',
    name: 'Renmin University of China',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.ruc.edu.cn',
    fields: 'Condensed Matter,Quantum Information',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,RUC Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Yu Wei (Condensed Matter)|Prof. Chen Xi (Quantum Information)',
    notesForNepali:
      'Small but growing physics department. Beijing location. Less competitive than PKU/Tsinghua. Good quantum information group. Beijing Government Scholarship available.',
  },
  {
    id: 'uni-27',
    name: 'Tianjin University',
    city: 'Tianjin',
    province: 'Tianjin',
    type: 'University',
    department: 'School of Science',
    researchGroup: null,
    url: 'https://science.tju.edu.cn',
    fields: 'Optics,Condensed Matter',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,TJU Scholarship,Tianjin Municipal Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Li Yan (Optics)|Prof. Wang Dong (Condensed Matter)',
    notesForNepali:
      'Close to Beijing (30 min by train). Tianjin is affordable. Good optics research. Tianjin Municipal Scholarship available. Less competitive admission.',
  },
  {
    id: 'uni-28',
    name: 'University of Electronic Science and Technology of China (UESTC)',
    city: 'Chengdu',
    province: 'Sichuan',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.uestc.edu.cn',
    fields: 'Condensed Matter,Plasma Physics,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UESTC Scholarship,Sichuan Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Li Ping (Condensed Matter)|Prof. Gong Xueyu (Plasma Physics)|Prof. Chen Zhaoying (Optics)',
    notesForNepali:
      'Chengdu - great food, affordable, growing Nepali community. Strong plasma physics program. UESTC is top in electronics-related physics. Sichuan Provincial Scholarship available.',
  },
  {
    id: 'uni-29',
    name: 'Nanjing University of Science and Technology',
    city: 'Nanjing',
    province: 'Jiangsu',
    type: 'University',
    department: 'School of Science',
    researchGroup: null,
    url: 'https://science.njust.edu.cn',
    fields: 'Optics,Condensed Matter',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,NJUST Scholarship,Jiangsu Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Chen Zhaoyang (Optics)|Prof. Liu Hui (Condensed Matter)',
    notesForNepali:
      'Good optics research (laser physics). Nanjing is affordable and pleasant. Jiangsu Provincial Scholarship available. Less competitive than NJU for admission.',
  },
  {
    id: 'uni-30',
    name: 'Soochow University',
    city: 'Suzhou',
    province: 'Jiangsu',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.suda.edu.cn',
    fields: 'Condensed Matter,Optics,Soft Matter Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,Soochow Scholarship,Jiangsu Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. He Ruihua (Condensed Matter)|Prof. Zhang Jiayu (Optics)|Prof. Chen Liang (Soft Matter Physics)',
    notesForNepali:
      'Unique soft matter physics program. Suzhou is near Shanghai (30 min train). Beautiful city with gardens. Jiangsu Provincial Scholarship available. Good for soft matter and polymer physics.',
  },
  {
    id: 'uni-31',
    name: 'Capital Normal University',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.cnu.edu.cn',
    fields: 'Optics,Condensed Matter',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,CNU Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhang Guangyin (Optics)|Prof. Sun Ping (Condensed Matter)',
    notesForNepali:
      'Good Beijing option with lower competition. Solid optics research. Beijing Government Scholarship available. Smaller department means more individual attention.',
  },
  {
    id: 'uni-32',
    name: 'Nankai University',
    city: 'Tianjin',
    province: 'Tianjin',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: null,
    url: 'https://physics.nankai.edu.cn',
    fields: 'Condensed Matter,Optics,Theoretical Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,Nankai Scholarship,Tianjin Municipal Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Xu Jingjun (Optics)|Prof. Zhou Li (Condensed Matter)|Prof. Zhao Ming (Theoretical Physics)',
    notesForNepali:
      'Strong theoretical physics tradition. Tianjin is close to Beijing and affordable. Good optics and condensed matter groups. Tianjin Municipal Scholarship available.',
  },
  {
    id: 'uni-33',
    name: 'Hunan University',
    city: 'Changsha',
    province: 'Hunan',
    type: 'University',
    department: 'School of Physics',
    researchGroup: null,
    url: 'https://physics.hnu.edu.cn',
    fields: 'Condensed Matter,Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,HNU Scholarship,Hunan Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Liu Zhengyou (Condensed Matter)|Prof. Wen Jin (Optics)',
    notesForNepali:
      'Changsha is affordable with vibrant culture. Growing physics department. Hunan Provincial Scholarship available. Good for Nepali students seeking less competitive options.',
  },
  {
    id: 'uni-34',
    name: 'University of Chinese Academy of Sciences (UCAS)',
    city: 'Beijing',
    province: 'Beijing',
    type: 'University',
    department: 'Various CAS Institutes',
    researchGroup: null,
    url: 'https://www.ucas.ac.cn',
    fields:
      'Condensed Matter,Particle Physics,Astrophysics,Optics,Plasma Physics,Nuclear Physics,Quantum Information,Atomic & Molecular Physics,Theoretical Physics,Applied Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Beijing Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Pan Jianwei (Quantum Information)|Prof. Wang Enge (Condensed Matter)|Prof. Cao Zexian (Superconductivity)|Prof. Chang Jin (Particle Physics)',
    notesForNepali:
      'UCAS is the gateway to ALL CAS institutes for PhD. You apply to UCAS and get assigned to a CAS institute. CAS President Scholarship is very generous. Covers all physics fields. Best option for research-focused PhD. Apply to specific CAS institute through UCAS portal.',
  },

  // ─────────────────────────────────────────────
  // CAS INSTITUTES (14)
  // ─────────────────────────────────────────────
  {
    id: 'uni-35',
    name: 'Institute of Physics (IOP), CAS',
    city: 'Beijing',
    province: 'Beijing',
    type: 'CAS Institute',
    department: 'Institute of Physics',
    researchGroup: 'Condensed Matter Physics',
    url: 'http://iop.cas.cn',
    fields: 'Condensed Matter,Superconductivity,Magnetism,Surface Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhao Zhongxian (Superconductivity)|Prof. Xiang Zhongxian (Superconductivity)|Prof. Wang Enge (Surface Physics)|Prof. Shen Baogen (Magnetism)',
    notesForNepali:
      'World-class condensed matter and superconductivity research. Zhao Zhongxian won National Highest Science Prize. Apply through UCAS. Very competitive. Beijing location excellent for networking.',
  },
  {
    id: 'uni-36',
    name: 'Institute of High Energy Physics (IHEP), CAS',
    city: 'Beijing',
    province: 'Beijing',
    type: 'CAS Institute',
    department: 'Institute of High Energy Physics',
    researchGroup: 'Particle Physics',
    url: 'http://ihep.cas.cn',
    fields: 'Particle Physics,Nuclear Physics,Accelerator Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Yifang (Particle Physics)|Prof. Cao Jun (Neutrino Physics)|Prof. Chang Jin (Cosmic Ray Physics)|Prof. Xu Huishan (Accelerator Physics)',
    notesForNepali:
      'Leading particle physics institute in China. Operates Daya Bay, JUNO experiments. Excellent for experimental particle physics. Apply through UCAS. Beijing + Dongguang campus.',
  },
  {
    id: 'uni-37',
    name: 'National Astronomical Observatories of China (NAOC), CAS',
    city: 'Beijing',
    province: 'Beijing',
    type: 'CAS Institute',
    department: 'National Astronomical Observatories',
    researchGroup: 'Astrophysics',
    url: 'http://naoc.cas.cn',
    fields: 'Astrophysics,Cosmology,Radio Astronomy',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Chen Jianrui (Astrophysics)|Prof. Wu Xuebing (Radio Astronomy)|Prof. Zhao Gang (Stellar Astrophysics)|Prof. Jing Yipeng (Cosmology)',
    notesForNepali:
      "Operates FAST (world's largest radio telescope), LAMOST. Best institute for astrophysics in China. Apply through UCAS. Opportunities at multiple observatory sites across China.",
  },
  {
    id: 'uni-38',
    name: 'Changchun Institute of Optics, Fine Mechanics and Physics (CIOMP), CAS',
    city: 'Changchun',
    province: 'Jilin',
    type: 'CAS Institute',
    department: 'Changchun Institute of Optics, Fine Mechanics and Physics',
    researchGroup: 'Optics and Applied Optics',
    url: 'http://ciomp.cas.cn',
    fields: 'Optics,Applied Optics,Laser Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Jilin Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Jianyu (Applied Optics)|Prof. Chen Tao (Laser Physics)|Prof. Zhang Xuejun (Optical Engineering)',
    notesForNepali:
      'Top optics institute in China. Applied and engineering optics focus. Changchun is cold but affordable. Apply through UCAS. Good for students interested in practical optics applications.',
  },
  {
    id: 'uni-39',
    name: 'Shanghai Institute of Optics and Fine Mechanics (SIOM), CAS',
    city: 'Shanghai',
    province: 'Shanghai',
    type: 'CAS Institute',
    department: 'Shanghai Institute of Optics and Fine Mechanics',
    researchGroup: 'Quantum Optics',
    url: 'http://siom.cas.cn',
    fields: 'Optics,Laser Physics,Quantum Optics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Shanghai Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Leng Yuxin (Laser Physics)|Prof. Zhang Weiping (Quantum Optics)|Prof. Zhu Jianqiang (Applied Optics)',
    notesForNepali:
      'Premier institute for laser physics and quantum optics. Shanghai location provides many opportunities. Apply through UCAS. Strong international collaborations in ultrafast lasers.',
  },
  {
    id: 'uni-40',
    name: 'Institute of Plasma Physics (ASIPP), CAS',
    city: 'Hefei',
    province: 'Anhui',
    type: 'CAS Institute',
    department: 'Institute of Plasma Physics',
    researchGroup: 'Plasma Physics and Fusion',
    url: 'http://ipp.cas.cn',
    fields: 'Plasma Physics,Nuclear Fusion,Magnetic Confinement',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Anhui Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wan Baonian (Magnetic Confinement)|Prof. Li Jiangang (Nuclear Fusion)|Prof. Song Yuntao (EAST Project)|Prof. Hou Yang (Plasma Physics)',
    notesForNepali:
      "Operates EAST (Experimental Advanced Superconducting Tokamak). World leader in fusion research. Excellent for plasma physics PhD. Hefei is affordable. Apply through UCAS. Great opportunity for Nepal's future energy research.",
  },
  {
    id: 'uni-41',
    name: 'Technical Institute of Physics and Chemistry (TIPC), CAS',
    city: 'Beijing',
    province: 'Beijing',
    type: 'CAS Institute',
    department: 'Technical Institute of Physics and Chemistry',
    researchGroup: 'Low Temperature Physics',
    url: 'http://ipc.cas.cn',
    fields: 'Condensed Matter,Low Temperature Physics,Functional Materials',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Li Laifeng (Low Temperature Physics)|Prof. Zhou Yuanyuan (Functional Materials)|Prof. Wu Jian (Condensed Matter)',
    notesForNepali:
      'Specialized in low temperature physics and functional materials. Beijing location. Apply through UCAS. Good for students interested in cryogenics and materials science.',
  },
  {
    id: 'uni-42',
    name: 'Wuhan Institute of Physics and Mathematics (WIPM), CAS',
    city: 'Wuhan',
    province: 'Hubei',
    type: 'CAS Institute',
    department: 'Wuhan Institute of Physics and Mathematics',
    researchGroup: 'Atomic and Molecular Physics',
    url: 'http://wipm.cas.cn',
    fields: 'Atomic & Molecular Physics,Mathematical Physics,NMR',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Hubei Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Liu Maiqing (Atomic Physics)|Prof. Ye Zhaorong (NMR)|Prof. Zhou Xin (Mathematical Physics)',
    notesForNepali:
      'Unique combination of physics and mathematics. Strong NMR research. Wuhan is affordable. Apply through UCAS. Good for students interested in atomic physics or mathematical physics.',
  },
  {
    id: 'uni-43',
    name: 'Purple Mountain Observatory (PMO), CAS',
    city: 'Nanjing',
    province: 'Jiangsu',
    type: 'CAS Institute',
    department: 'Purple Mountain Observatory',
    researchGroup: 'Astrophysics',
    url: 'http://pmo.cas.cn',
    fields: 'Astrophysics,Planetary Science,Space Astronomy',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Jiangsu Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Chang Jin (Space Astronomy)|Prof. Ji Jianghui (Planetary Science)|Prof. Fan Yizhong (High Energy Astrophysics)',
    notesForNepali:
      'Historic observatory with modern research. Strong planetary science and space astronomy. Nanjing location is pleasant. Apply through UCAS. Named after Purple Mountain - iconic location.',
  },
  {
    id: 'uni-44',
    name: 'Yunnan Observatories (YNAO), CAS',
    city: 'Kunming',
    province: 'Yunnan',
    type: 'CAS Institute',
    department: 'Yunnan Observatories',
    researchGroup: 'Solar and Stellar Physics',
    url: 'http://ynao.cas.cn',
    fields: 'Astrophysics,Solar Physics,Stellar Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Yunnan Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Han Zhanwen (Stellar Physics)|Prof. Li Ying (Solar Physics)|Prof. Qian Shengbang (Binary Stars)',
    notesForNepali:
      'Kunming has spring-like weather year-round (eternal spring city). Excellent solar physics research. Very affordable city. Apply through UCAS. Great climate for Nepali students - similar to Kathmandu valley.',
  },
  {
    id: 'uni-45',
    name: 'Xinjiang Astronomical Observatory (XAO), CAS',
    city: 'Urumqi',
    province: 'Xinjiang',
    type: 'CAS Institute',
    department: 'Xinjiang Astronomical Observatory',
    researchGroup: 'Radio Astronomy',
    url: 'http://xao.cas.cn',
    fields: 'Radio Astronomy,Astrophysics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Wang Na (Radio Astronomy)|Prof. Liu Xiang (Pulsars)|Prof. Ailiemu (Galactic Astronomy)',
    notesForNepali:
      'Unique radio astronomy research. Urumqi has dry continental climate. Very affordable. Apply through UCAS. Note: cultural considerations for Xinjiang region. Good radio telescope facilities.',
  },
  {
    id: 'uni-46',
    name: 'Institute of Solid State Physics (ISSP), CAS',
    city: 'Hefei',
    province: 'Anhui',
    type: 'CAS Institute',
    department: 'Institute of Solid State Physics',
    researchGroup: 'Condensed Matter Physics',
    url: 'http://issp.cas.cn',
    fields: 'Condensed Matter,Computational Materials Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Anhui Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Zhang Shuyuan (Condensed Matter)|Prof. Li Yongping (Computational Physics)|Prof. Fang Rongchuan (Materials Physics)',
    notesForNepali:
      'Strong computational and condensed matter physics. Hefei is affordable and growing as a science city. Apply through UCAS. Good for students interested in computational approaches to physics.',
  },
  {
    id: 'uni-47',
    name: 'Fujian Institute of Research on the Structure of Matter (FJIRSM), CAS',
    city: 'Fuzhou',
    province: 'Fujian',
    type: 'CAS Institute',
    department: 'Fujian Institute of Research on the Structure of Matter',
    researchGroup: 'Crystal Structure and Functional Materials',
    url: 'http://fjirsm.cas.cn',
    fields: 'Condensed Matter,Crystal Structure,Functional Materials',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Fujian Provincial Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Hong Maochun (Crystal Structure)|Prof. Luo Junhua (Functional Materials)|Prof. Sun Daofeng (Condensed Matter)',
    notesForNepali:
      'Specialized in crystal structure and functional materials. Fuzhou is a pleasant coastal city. Apply through UCAS. Good for students interested in crystallography and materials physics.',
  },
  {
    id: 'uni-48',
    name: 'Shanghai Institute of Ceramics (SICCAS), CAS',
    city: 'Shanghai',
    province: 'Shanghai',
    type: 'CAS Institute',
    department: 'Shanghai Institute of Ceramics',
    researchGroup: 'Materials Physics',
    url: 'http://sic.cas.cn',
    fields: 'Condensed Matter,Materials Physics',
    deadline: 'March-April 2026 (for September 2026 intake)',
    englishProgram: true,
    hskRequired: false,
    hskLevel: null,
    cscDesignated: true,
    scholarshipTypes: 'CSC,UCAS Scholarship,CAS President Scholarship,Shanghai Government Scholarship',
    requiredDocuments:
      'Passport,Transcripts,Degree Certificate,Recommendation Letters,Research Proposal,Physical Examination Form,CSC Application Form,Study Plan,HSK Certificate (if applicable)',
    notableProfessors:
      'Prof. Dong Xianlin (Condensed Matter)|Prof. Chen Zhijian (Materials Physics)|Prof. Wang Shimin (Ceramic Physics)',
    notesForNepali:
      'Focus on condensed matter and ceramic/materials physics. Shanghai location. Apply through UCAS. Good for students interested in materials science with physics background.',
  },
] as const satisfies University[]

// ─────────────────────────────────────────────
// CSC INFO ENTRIES (21)
// ─────────────────────────────────────────────
export const cscInfo: CSCInfo[] = [
  // ── Type A ──
  {
    id: 'csc-1',
    title: 'CSC Type A Scholarship (Bilateral Program)',
    category: 'Type A',
    content: JSON.stringify({
      description:
        'The CSC Type A scholarship is a bilateral program between China and Nepal, administered through the Chinese Embassy in Kathmandu. It covers full financial support for international students to pursue PhD studies in China.',
      coverage:
        'Full tuition waiver, free university dormitory or accommodation subsidy, stipend of CNY 3,500/month (PhD level), comprehensive medical insurance',
      eligibility:
        "Nepali citizens with a Master's degree in Physics or related field, under age 35 for PhD, in good health, no other Chinese scholarships simultaneously",
      process:
        '1) Apply online at CSC portal (https://studyinchina.csc.edu.cn), 2) Submit documents to Chinese Embassy in Kathmandu, 3) Embassy forwards to CSC, 4) CSC reviews and allocates to university, 5) University sends admission notice',
      deadline: 'January-April 2026',
      agencyNumber: '5861',
      notes: 'Must apply through Embassy of China in Kathmandu. You CANNOT apply directly to the university for Type A. The agency number 5861 is for Nepal. Submit physical documents to the embassy.',
      stipendAmount: 'CNY 3,500/month (PhD)',
      tuitionCovered: true,
      accommodationCovered: true,
      medicalInsuranceCovered: true,
    }),
  },
  // ── Type B ──
  {
    id: 'csc-2',
    title: 'CSC Type B Scholarship (Chinese University Program)',
    category: 'Type B',
    content: JSON.stringify({
      description:
        'The CSC Type B scholarship allows direct application to Chinese universities through the CSC online portal. This is often the easier route for students who have already identified their target university and supervisor.',
      coverage:
        'Full tuition waiver, free university dormitory or accommodation subsidy, stipend of CNY 3,500/month (PhD level), comprehensive medical insurance',
      eligibility:
        "Nepali citizens with a Master's degree in Physics or related field, under age 35 for PhD, in good health, no other Chinese scholarships simultaneously",
      process:
        "1) Contact potential supervisor and get acceptance, 2) Apply online at CSC portal (https://studyinchina.csc.edu.cn), 3) Upload all required documents, 4) University reviews and recommends to CSC, 5) CSC approves and university sends admission notice",
      deadline: 'March-April 2026',
      portalUrl: 'https://studyinchina.csc.edu.cn',
      agencyNumber: 'Varies by university (check university website)',
      notes: "Can apply to maximum 3 universities through Type B. You MUST contact a supervisor BEFORE applying. Having a supervisor's acceptance letter greatly increases your chances. Apply early as slots fill quickly.",
      stipendAmount: 'CNY 3,500/month (PhD)',
      tuitionCovered: true,
      accommodationCovered: true,
      medicalInsuranceCovered: true,
      maxUniversities: 3,
    }),
  },
  // ── Timeline entries ──
  {
    id: 'csc-3',
    title: 'CSC 2026 Intake Application Timeline',
    category: 'Timeline',
    content: JSON.stringify({
      title: 'Key Dates for September 2026 Intake',
      events: [
        {
          date: 'October 2025',
          event: 'CSC portal opens for applications. Start contacting professors.',
        },
        {
          date: 'November-December 2025',
          event: 'Contact potential supervisors, get acceptance letters. Prepare documents.',
        },
        {
          date: 'January 2026',
          event: 'Type A applications open at Chinese Embassy Kathmandu. Submit physical documents.',
        },
        {
          date: 'January-March 2026',
          event: 'Type A application period. Embassy forwards to CSC.',
        },
        {
          date: 'March 2026',
          event: 'Type B applications open on CSC portal. Apply to up to 3 universities.',
        },
        {
          date: 'March-April 2026',
          event: 'Type B application deadline (varies by university). Most deadlines in this window.',
        },
        {
          date: 'April-May 2026',
          event: 'University reviews applications. Interviews may be conducted online.',
        },
        {
          date: 'June-July 2026',
          event: 'Admission results announced. CSC sends scholarship awards.',
        },
        {
          date: 'July-August 2026',
          event: 'Apply for X1 visa at Chinese Embassy in Kathmandu. Book flights.',
        },
        {
          date: 'August-September 2026',
          event: 'Arrive in China. University registration and orientation.',
        },
        {
          date: 'September 2026',
          event: 'Semester begins. Enjoy your PhD journey in China!',
        },
      ],
      notes: 'Start preparing AT LEAST 6 months before deadline. The earlier you contact professors, the better. Document preparation (transcripts, recommendation letters) takes time in Nepal.',
    }),
  },
  {
    id: 'csc-4',
    title: 'University Direct Application Deadlines',
    category: 'Timeline',
    content: JSON.stringify({
      title: 'University-Level Scholarship Deadlines (2026 Intake)',
      events: [
        {
          date: 'November 2025',
          event: 'PKU, Tsinghua, USTC early applications open.',
        },
        {
          date: 'December 2025 - January 2026',
          event: 'Most top universities open their scholarship portals.',
        },
        {
          date: 'February-March 2026',
          event: 'Peak application period for university-specific scholarships.',
        },
        {
          date: 'March-April 2026',
          event: 'Most university scholarship deadlines fall in this period.',
        },
        {
          date: 'April-May 2026',
          event: 'Late applications for some universities still possible.',
        },
      ],
      notes: "Always check the specific university's international student office website for exact dates. Many universities have ROLLING admissions for self-funded students.",
    }),
  },
  // ── Embassy ──
  {
    id: 'csc-5',
    title: 'Chinese Embassy in Nepal',
    category: 'Embassy',
    content: JSON.stringify({
      address: 'Baluwatar, Kathmandu, Nepal',
      phone: '+977-1-4411740',
      fax: '+977-1-4415724',
      email: 'chinaemb_np@mfa.gov.cn',
      website: 'http://np.china-embassy.gov.cn',
      consularSection: {
        address: 'Hattisar, Kathmandu, Nepal',
        phone: '+977-1-4411740',
        workingHours: 'Monday-Friday 9:00-12:00 (submit applications), 15:00-16:00 (pick up)',
      },
      educationOffice: {
        note: 'Contact the Education Office for CSC Type A scholarship queries',
      },
      notes: "Submit Type A applications here. Bring all original documents and photocopies. Arrive early as there can be queues. The embassy is in Baluwatar, near the Prime Minister's residence.",
      visaApplication: {
        note: 'After receiving admission notice and JW201/JW202 form, apply for X1 visa here.',
        requiredForVisa: 'Passport, Admission Notice, JW201/JW202 form, Physical Examination Form, Photos',
      },
    }),
  },
  {
    id: 'csc-6',
    title: 'Chinese Consulate General in Nepal',
    category: 'Embassy',
    content: JSON.stringify({
      address: 'Hattisar, Kathmandu, Nepal',
      note: 'The Chinese Embassy in Kathmandu handles all consular services for Nepal. There is no separate consulate in other Nepali cities.',
      services: 'Visa processing, document attestation, CSC Type A application submission',
      workingHours: 'Monday-Friday 9:00-12:00',
      notes: 'If you are outside Kathmandu Valley, you can mail documents but original passport must be submitted in person for visa.',
    }),
  },
  // ── Documents ──
  {
    id: 'csc-7',
    title: 'Complete Document Checklist for CSC Application',
    category: 'Documents',
    content: JSON.stringify({
      title: 'Required Documents for CSC PhD Application',
      documents: [
        {
          item: 'Valid Passport',
          details: 'Must be valid for at least 6 months beyond your planned stay. Include photocopy of bio page.',
        },
        {
          item: 'CSC Online Application Form',
          details: 'Fill at https://studyinchina.csc.edu.cn. Print and sign. Different agency numbers for Type A (5861) and Type B (university-specific).',
        },
        {
          item: 'Highest Degree Certificate',
          details: 'Notarized copy of MSc degree certificate. If not yet graduated, provide certificate of expected graduation.',
        },
        {
          item: 'Transcripts',
          details: 'Notarized transcripts from BSc and MSc. Must be in English or Chinese, or with notarized translations.',
        },
        {
          item: 'Study Plan / Research Proposal',
          details: 'Minimum 800 words in English or Chinese. Outline your research interests, planned topic, and career goals. Tailor to the target university.',
        },
        {
          item: 'Recommendation Letters',
          details: 'Two letters from professors or associate professors. Should include contact information of referees. Preferably from MSc thesis supervisor.',
        },
        {
          item: 'Foreigner Physical Examination Form',
          details: 'Download from CSC website. Must be completed by a doctor. Blood tests, chest X-ray, ECG required. Valid for 6 months. Get it done at designated hospitals in Nepal.',
        },
        {
          item: 'HSK Certificate (if applicable)',
          details: 'Required for Chinese-medium programs. HSK 4 minimum for most programs. Not needed for English-medium PhD programs.',
        },
        {
          item: 'Acceptance Letter from Supervisor',
          details: 'Strongly recommended for Type B applications. Shows a professor has agreed to supervise you. Can significantly boost your chances.',
        },
        {
          item: 'Passport-size Photos',
          details: '2-4 recent photos (white background, no hat). Keep digital copies for online applications.',
        },
        {
          item: 'English Proficiency Proof',
          details: 'TOEFL/IELTS scores OR certificate from your university stating English was the medium of instruction. Not always mandatory but helpful.',
        },
        {
          item: 'Publication List (if any)',
          details: 'List any research papers, conference presentations. Include DOI links. Even preprints count. This strengthens your application.',
        },
        {
          item: 'CV/Resume',
          details: 'Academic CV including education, research experience, skills, publications, awards. Keep to 2-3 pages.',
        },
      ],
      tips: [
        'Get all documents NOTARIZED by a notary public in Nepal.',
        'Translate Nepali documents to English and get translations notarized.',
        'Make multiple copies of everything.',
        'Scan all documents at high resolution for online applications.',
        'Some documents need apostille - check with embassy.',
        'Physical examination must be done at specific hospitals - check CSC website.',
        'Keep originals safe - you will need them again for visa.',
      ],
    }),
  },
  {
    id: 'csc-8',
    title: 'Document Attestation Process in Nepal',
    category: 'Documents',
    content: JSON.stringify({
      title: 'How to Get Documents Attested in Nepal',
      process: [
        {
          step: 1,
          action: 'Get documents notarized by a registered Notary Public in Nepal.',
        },
        {
          step: 2,
          action: 'Get attestation from the Ministry of Education, Science and Technology (MOEST), Singh Durbar, Kathmandu.',
        },
        {
          step: 3,
          action: 'Get attestation from the Ministry of Foreign Affairs (MOFA), Tripureshwor, Kathmandu.',
        },
        {
          step: 4,
          action: 'Get attestation from the Chinese Embassy in Kathmandu (for Type A) or include in application (for Type B).',
        },
      ],
      notes: 'Start this process AT LEAST 2 months before the application deadline. Each step can take 1-2 weeks. Bring originals and photocopies to each office. Fees apply at each step.',
      importantOffices: {
        notaryPublic: 'Available in major cities across Nepal',
        moest: 'Singh Durbar, Kathmandu. Process: 5-7 working days.',
        mofa: 'Tripureshwor, Kathmandu. Process: 3-5 working days.',
        chineseEmbassy: 'Baluwatar, Kathmandu. Process: 5-7 working days.',
      },
    }),
  },
  // ── Provincial Scholarships ──
  {
    id: 'csc-9',
    title: 'Beijing Government Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Beijing',
      coverage: 'Full or partial tuition waiver. Some include accommodation and stipend.',
      stipend: 'Varies: CNY 2,000-3,500/month for PhD',
      eligibility: 'International students applying to Beijing-based universities.',
      applicationProcess: "Apply through the university's international student office. Check university website for details.",
      deadline: 'February-April 2026',
      universities: [
        'Peking University',
        'Tsinghua University',
        'Beijing Institute of Technology',
        'Beijing Normal University',
        'Renmin University of China',
        'Capital Normal University',
        'UCAS',
      ],
      notes: 'Beijing Government Scholarship is competitive but many slots available. Apply early. Can combine with university-specific scholarships.',
    }),
  },
  {
    id: 'csc-10',
    title: 'Shanghai Government Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Shanghai',
      coverage: 'Type A: Full scholarship (tuition, accommodation, stipend, insurance). Type B: Tuition only. Type C: Partial.',
      stipend: 'CNY 3,000-3,500/month for PhD (Type A)',
      eligibility: 'International students applying to Shanghai-based universities.',
      applicationProcess: 'Apply through the university. Each Shanghai university has its own process.',
      deadline: 'February-April 2026',
      universities: [
        'Fudan University',
        'Shanghai Jiao Tong University',
        'Tongji University',
        'East China Normal University',
        'SIOM (CAS)',
        'SICCAS (CAS)',
      ],
      notes: 'Shanghai Government Scholarship is generous. Type A covers everything. Apply through university international student office. Can be combined with university scholarships.',
    }),
  },
  {
    id: 'csc-11',
    title: 'Jiangsu Provincial Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Jiangsu',
      coverage: 'Full scholarship (tuition, accommodation, stipend) or partial scholarship.',
      stipend: 'CNY 2,500-3,500/month for PhD',
      eligibility: 'International students applying to Jiangsu-based universities.',
      applicationProcess: "Apply through the university's international student office.",
      deadline: 'March-April 2026',
      universities: [
        'Nanjing University',
        'Southeast University',
        'Nanjing University of Science and Technology',
        'Soochow University',
        'Purple Mountain Observatory (CAS)',
      ],
      notes: 'Jiangsu is a wealthy province with good scholarship funding. Nanjing is affordable. Multiple scholarship categories available.',
    }),
  },
  {
    id: 'csc-12',
    title: 'Zhejiang Provincial Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Zhejiang',
      coverage: 'Full or partial scholarship. Covers tuition, accommodation, and stipend.',
      stipend: 'CNY 2,500-3,500/month for PhD',
      eligibility: 'International students applying to Zhejiang-based universities.',
      applicationProcess: "Apply through the university's international student office.",
      deadline: 'March-April 2026',
      universities: ['Zhejiang University'],
      notes: 'Zhejiang Provincial Scholarship is available at ZJU. Hangzhou is a beautiful and moderately priced city. Good combination of living quality and academic excellence.',
    }),
  },
  {
    id: 'csc-13',
    title: 'Guangdong Provincial Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Guangdong',
      coverage: 'Full or partial scholarship. Covers tuition, accommodation, stipend.',
      stipend: 'CNY 2,500-3,500/month for PhD',
      eligibility: 'International students applying to Guangdong-based universities.',
      applicationProcess: "Apply through the university's international student office.",
      deadline: 'March-April 2026',
      universities: [
        'Sun Yat-sen University',
        'South China University of Technology',
      ],
      notes: "Guangdong is China's richest province. Good scholarship funding. Warm climate similar to Nepal's Terai. Large Nepali community in Guangzhou. Great food!",
    }),
  },
  {
    id: 'csc-14',
    title: 'Anhui Provincial Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Anhui',
      coverage: 'Tuition waiver, accommodation, and stipend.',
      stipend: 'CNY 2,000-3,000/month for PhD',
      eligibility: 'International students applying to Anhui-based universities and CAS institutes.',
      applicationProcess: 'Apply through the university or CAS institute.',
      deadline: 'March-April 2026',
      universities: [
        'USTC',
        'Institute of Plasma Physics (CAS)',
        'Institute of Solid State Physics (CAS)',
      ],
      notes: 'Hefei is a major science city with many CAS institutes. Very affordable cost of living. Anhui Provincial Scholarship combined with CAS President Scholarship provides excellent support.',
    }),
  },
  {
    id: 'csc-15',
    title: 'Sichuan Provincial Scholarship',
    category: 'Provincial',
    content: JSON.stringify({
      province: 'Sichuan',
      coverage: 'Full or partial scholarship.',
      stipend: 'CNY 2,000-3,000/month for PhD',
      eligibility: 'International students applying to Sichuan-based universities.',
      applicationProcess: "Apply through the university's international student office.",
      deadline: 'March-April 2026',
      universities: ['Sichuan University', 'UESTC'],
      notes: 'Chengdu is known for its relaxed lifestyle and amazing food. Affordable city. Growing Nepali community. Sichuan Provincial Scholarship available at major universities.',
    }),
  },
  // ── University Scholarships ──
  {
    id: 'csc-16',
    title: 'PKU International Student Scholarship',
    category: 'University',
    content: JSON.stringify({
      university: 'Peking University',
      coverage: 'Full tuition waiver, accommodation, stipend CNY 3,500/month, medical insurance.',
      eligibility: 'Outstanding international PhD students.',
      applicationProcess: 'Apply through PKU International Student Division after receiving admission.',
      deadline: 'March 2026',
      notes: 'Very competitive. Strong academic record required. Nepali students with publications have better chances.',
    }),
  },
  {
    id: 'csc-17',
    title: 'Tsinghua University Scholarship',
    category: 'University',
    content: JSON.stringify({
      university: 'Tsinghua University',
      coverage: 'Full tuition waiver, accommodation, stipend CNY 3,500/month, medical insurance.',
      eligibility: 'Outstanding international PhD students.',
      applicationProcess: 'Apply through Tsinghua Admissions after receiving admission offer.',
      deadline: 'March 2026',
      notes: 'Extremely competitive. Need top academic credentials. Research experience and publications strongly preferred.',
    }),
  },
  {
    id: 'csc-18',
    title: 'USTC Scholarship for International Students',
    category: 'University',
    content: JSON.stringify({
      university: 'University of Science and Technology of China',
      coverage: 'Full tuition waiver, accommodation, stipend CNY 3,000-3,500/month, medical insurance.',
      eligibility: 'International PhD students with strong academic background.',
      applicationProcess: 'Apply through USTC International Student Office.',
      deadline: 'March-April 2026',
      notes: 'Good funding opportunities. Quantum information and physics groups well-funded. Hefei is affordable, so stipend goes further.',
    }),
  },
  {
    id: 'csc-19',
    title: 'CAS President Scholarship',
    category: 'University',
    content: JSON.stringify({
      university: 'University of Chinese Academy of Sciences (all CAS institutes)',
      coverage: 'Full tuition waiver, accommodation, enhanced stipend CNY 4,000-5,000/month, medical insurance.',
      eligibility: 'Outstanding international PhD students at CAS institutes.',
      applicationProcess: 'Apply through UCAS after admission to a CAS institute.',
      deadline: 'March-April 2026',
      notes: 'The most generous scholarship for physics PhD in China. Only available at CAS institutes through UCAS. Higher stipend than regular CSC. Very competitive but worth applying.',
    }),
  },
  {
    id: 'csc-20',
    title: 'Fudan University International Student Scholarship',
    category: 'University',
    content: JSON.stringify({
      university: 'Fudan University',
      coverage: 'Full or partial tuition waiver, accommodation subsidy, stipend.',
      eligibility: 'International PhD students with strong academic record.',
      applicationProcess: 'Apply through Fudan International Student Office.',
      deadline: 'March 2026',
      notes: 'Can be combined with Shanghai Government Scholarship. Good funding available for physics students.',
    }),
  },
  {
    id: 'csc-21',
    title: 'SJTU International Student Scholarship',
    category: 'University',
    content: JSON.stringify({
      university: 'Shanghai Jiao Tong University',
      coverage: 'Full tuition waiver, accommodation, stipend CNY 3,500/month, medical insurance.',
      eligibility: 'International PhD students.',
      applicationProcess: 'Apply through SJTU International Student Office.',
      deadline: 'March 2026',
      notes: 'Good scholarship coverage. Astrophysics and particle physics groups well-funded. Shanghai location provides industry connections.',
    }),
  },
] as const satisfies CSCInfo[]
