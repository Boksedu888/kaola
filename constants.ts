
export const MIN_IMAGES = 1;
export const MAX_IMAGES = 6;

export type Language = 'en' | 'zh';

export const translations = {
  en: {
    title: 'AI Product Ad Generator',
    langSwitch: '中文',
    uploadTitle: '1. Upload Product Images',
    uploadSubtitle: `Upload between ${MIN_IMAGES} and ${MAX_IMAGES} images of your product.`,
    uploadButton: 'Select Images',
    promptTitle: '2. Describe Your Ad',
    promptPlaceholder: 'e.g., "A minimalist product shot on a marble surface with soft, natural lighting."',
    generateButton: 'Generate Ad',
    randomButton: 'Generate Randomly',
    generating: 'Generating...',
    resultTitle: 'Generated Advertisement',
    resultPlaceholder: 'Your generated ad image will appear here.',
    downloadButton: 'Download Image',
    errorNoImages: 'Please upload at least one product image to generate an ad.',
    errorNoPrompt: 'Please enter a prompt to describe the ad you want.',
    errorTooManyFiles: `You can only upload a maximum of ${MAX_IMAGES} files.`,
    errorGenerationFailed: 'Failed to generate image. The model may have refused the request. Please try a different prompt or image.',
    generatingMessage1: 'Brewing creativity...',
    generatingMessage2: 'Polishing pixels...',
    generatingMessage3: 'Assembling your masterpiece...',
    generatingMessage4: 'The AI is hard at work!',
    examplePromptsTitle: 'Example Prompts',
    examplePromptsSubtitle: 'Click an example to use it',
  },
  zh: {
    title: 'AI 产品广告图片生成器',
    langSwitch: 'English',
    uploadTitle: '1. 上传产品图片',
    uploadSubtitle: `请上传 ${MIN_IMAGES} 到 ${MAX_IMAGES} 张您的产品图片。`,
    uploadButton: '选择图片',
    promptTitle: '2. 描述您的广告',
    promptPlaceholder: '例如：“一个极简风格的产品图，在大理石表面上，光线柔和自然。”',
    generateButton: '生成广告',
    randomButton: '随机生成',
    generating: '生成中...',
    resultTitle: '生成的广告',
    resultPlaceholder: '您生成的广告图片将显示在这里。',
    downloadButton: '下载图片',
    errorNoImages: '请至少上传一张产品图片以生成广告。',
    errorNoPrompt: '请输入提示词来描述您想要的广告。',
    errorTooManyFiles: `您最多只能上传 ${MAX_IMAGES} 个文件。`,
    errorGenerationFailed: '图片生成失败。模型可能拒绝了该请求。请尝试不同的提示或图片。',
    generatingMessage1: '正在酝酿创意...',
    generatingMessage2: '正在打磨像素...',
    generatingMessage3: '正在组装您的杰作...',
    generatingMessage4: 'AI 正在努力工作中！',
    examplePromptsTitle: '提示词范例',
    examplePromptsSubtitle: '点击使用范例',
  },
};

export const randomPrompts = {
  en: [
    "A minimalist product shot on a marble surface with soft, natural lighting and subtle shadows.",
    "The product floating in a vibrant, abstract background with swirling colors and geometric shapes.",
    "A lifestyle photo showing the product being used in a cozy, modern home setting, with warm tones.",
    "Create a dramatic, high-contrast image with the product as the hero, surrounded by dynamic light streaks.",
    "The product displayed on a pedestal made of natural stone, surrounded by lush green foliage and flowers.",
    "An action shot of the product with water splashes and droplets, conveying a sense of freshness and energy.",
    "A futuristic and sleek presentation of the product on a reflective, dark surface with neon light accents."
  ],
  zh: [
    "一个极简主义的产品摄影，在大理石表面上，具有柔和的自然光和微妙的阴影。",
    "产品漂浮在充满活力的抽象背景中，背景有旋转的色彩和几何形状。",
    "一张生活方式照片，展示产品在舒适、现代的家居环境中使用，色调温暖。",
    "创建一张戏剧性的高对比度图片，产品是主角，周围环绕着动态的光束。",
    "产品陈列在由天然石材制成的基座上，周围是茂密的绿色植物和花朵。",
    "一张带有水花和水滴的产品动态照片，传达出清新和活力的感觉。",
    "在反光的深色表面上，用霓虹灯点缀，对产品进行未来感和时尚的展示。"
  ]
};

export interface ExamplePrompt {
  title: string;
  prompt: string;
}

export const examplePrompts: { en: ExamplePrompt[], zh: ExamplePrompt[] } = {
  en: [
    { title: "Industry: Tech", prompt: "Vivid tech feel, suitable for digital product ads; cool-toned highlights, professional studio shot texture." },
    { title: "Lighting: Dramatic", prompt: "Three-point lighting, soft key light, fill light highlighting product texture, simulating a city night scene for a high-end, blockbuster feel." },
    { title: "Branding: Storytelling", prompt: "Include a brand logo wall and elegant props (like a vase or books) to emphasize brand storytelling." },
    { title: "Technical: 8K", prompt: "Output in 8K resolution, with automatic professional retouching and color correction for a sharp, detailed image." },
    { title: "Platform: Instagram", prompt: "Adapt for Instagram ad ratio, with automatic cropping and composition, generating a set for A/B testing." },
    { title: "Brief: Detailed", prompt: "For a smartwatch, tech fashion, with a blue-gray color palette, aiming for a magazine cover-level ad." },
    { title: "Style: Apple", prompt: "Reference Apple's classic ad style: minimalist visuals with lighting that emphasizes a high-tech feel." },
    { title: "Tweak: Pro Optimization", prompt: "Optimize image details and lighting based on professional advertising photography standards." },
  ],
  zh: [
    { title: "行业模板", prompt: "生动科技感，适合数码产品广告宣传的画面风格；冷色调高光，专业棚拍质感。" },
    { title: "高级布光与场景", prompt: "三点布光，主灯柔和、辅灯突显产品质感，模拟都市夜景背景，氛围高级且具广告大片感。" },
    { title: "品牌元素与道具", prompt: "加入品牌Logo墙，摆放精致道具（如典雅花瓶、书本），突出品牌故事性。" },
    { title: "高分辨率 & 修图", prompt: "输出8K分辨率，自动专业修图、色彩校正，画面清晰细腻。" },
    { title: "营销场景 & 平台规格", prompt: "适配Instagram广告比例，自动构图裁切，生成一组可A/B测试的广告方案。" },
    { title: "多模态细化", prompt: "产品图片+描述：‘智能手表，科技时尚’，主色调蓝灰，要求杂志封面级广告效果。" },
    { title: "案例风格模仿", prompt: "参考Apple经典产品广告风格，画面简约，光影突出科技质感。" },
    { title: "自动优化建议补充", prompt: "请根据专业广告摄影标准优化画面细节与光线表现。" },
  ]
};
