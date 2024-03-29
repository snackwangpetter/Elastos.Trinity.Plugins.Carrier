/*
 * Copyright (c) 2019 Elastos Foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package org.elastos.trinity.plugins.carrier;

import android.content.res.Resources;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import org.elastos.trinity.runtime.R;

import java.io.InputStream;
import java.util.ArrayList;
import java.io.IOException;
import java.io.InputStream;

public class BootstrapsGetter {
    @SerializedName("bootstraps")
    public ArrayList<BootstrapNode> bootstrapNodes;

    static public class BootstrapNode {
        @SerializedName("ipv4")
        public String ipv4;

        @SerializedName("port")
        public int port;

        @SerializedName("publicKey")
        public String publicKey;
    }

    private static String asJsonFile(InputStream inputStream) {
        try {
            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes, 0, bytes.length);
            String json = new String(bytes);
            return json;
        } catch (IOException e) {
            return null;
        }
    }

    public static ArrayList<BootstrapNode> getBootstrapNodes(CarrierPlugin plugin) {
        Resources res = plugin.cordova.getActivity().getResources();
        String jsonFile = asJsonFile(res.openRawResource(R.raw.bootstraps));
        if (jsonFile == null)
            return null;

        BootstrapsGetter getter = new Gson().fromJson(jsonFile, BootstrapsGetter.class);
        return getter.bootstrapNodes;
    }
}

