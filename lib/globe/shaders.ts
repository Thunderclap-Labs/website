export const shaders = {
  globe: {
    vertexShader: `
	varying vec3 vNormal;
	varying vec2 vUv;
	void main() {
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		vNormal = normalize( normalMatrix * normal );
		vUv = uv;
	}
`,
    fragmentShader: `
	uniform sampler2D globeTexture;
	uniform float opacity;
	varying vec3 vNormal;
	varying vec2 vUv;
	void main() {
		vec3 diffuse = texture2D( globeTexture, vUv ).xyz;
		float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
		vec3 atmosphere = vec3( 0.3, 0.6, 1.0 ) * pow( intensity, 2.0 );
		gl_FragColor = vec4( diffuse + atmosphere, opacity );
	}
`
  },
  atmosphere: {
    vertexShader: `
	varying vec3 vNormal;
	void main() {
		vNormal = normalize( normalMatrix * normal );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`,
    fragmentShader: `
	uniform float opacity;
	varying vec3 vNormal;
	void main() 
	{
		float intensity = pow( 1.0 - abs(dot( vNormal, vec3( 0.0, 0.0, 1.0 ) )), 4.0 ); 
	    gl_FragColor = vec4( 0.3, 0.6, 1.0, intensity * opacity );
	}
`
  },
  dot: {
    vertexShader: `
	attribute float size;
	attribute vec3 customColor;
	varying vec3 vColor;
	void main() {
		vColor = customColor;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_PointSize = size * ( 300.0 / -mvPosition.z );
		gl_Position = projectionMatrix * mvPosition;
	}
`,
    fragmentShader: `
	uniform vec3 color;
	uniform sampler2D pointTexture;
	varying vec3 vColor;
	void main() {
		gl_FragColor = vec4( color * vColor, 1.0 );
		gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
		if ( gl_FragColor.a < ALPHATEST ) discard;
	}
`
  }
};
